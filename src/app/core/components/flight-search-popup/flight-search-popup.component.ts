import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  EMPTY,
  Observable,
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
  take,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { TUI_DATE_FORMAT, TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogContext, TuiNotification } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AirportsService } from '@core/services/airports.service';
import { FlightsService } from '@core/services/flights.service';
import { Airport } from '@booking/types/airport';
import { FlightType } from '@shared/types/flight-type';
import { Passengers } from '@shared/types/passengers';
import { adultValidator } from '@shared/validators/adultValidator';
import { selectFlightSearchData } from '@store/selectors/flight-data.selectors';
import { saveFlightSearch, saveFlights } from '@store/actions/flight-data.actions';
import { FlightSearchData } from '@shared/types/flight-data';
import { FlightsRequest } from '@shared/types/flights-request';
import { FLIGHT_SEARCH_DEBOUNCE_TIME, FLIGHT_SEARCH_MINIMUM_QUERY_LENGTH } from '@flight-search/constants';
import { ALERT_DISPLAY_DURATION } from '@core/constants/alerts.constants';
import { taigaDateFormat } from '@shared/factories/taiga-date-format.factory';
import { UserSettingsService } from '@core/services/user-settings.service';

@Component({
  selector: 'air-flight-search-popup',
  templateUrl: './flight-search-popup.component.html',
  styleUrls: ['./flight-search-popup.component.scss'],
  providers: [
    {
      provide: TUI_DATE_FORMAT,
      useFactory: taigaDateFormat,
      deps: [UserSettingsService],
    },
  ],
})
export class FlightSearchPopupComponent implements OnInit, OnDestroy {
  airportForm = this.fb.group({
    flightType: this.fb.control<FlightType | null>('roundtrip', [Validators.required]),
    departure: this.fb.control<Airport | null>(null, [Validators.required]),
    arrival: this.fb.control<Airport | null>(null, [Validators.required]),
    date: this.fb.control<TuiDay | TuiDayRange | null>(null, [Validators.required]),
    passengers: this.fb.control<Passengers | null>({ adults: 1, children: 0, infants: 0 }, [
      Validators.required,
      adultValidator,
    ]),
  });
  private searchDeparture$$ = new Subject<string | null>();
  private searchArrival$$ = new Subject<string | null>();
  airportsDeparture$ = this.getAirports(this.searchDeparture$$);
  airportsArrival$ = this.getAirports(this.searchArrival$$);
  flightData$ = this.store.select(selectFlightSearchData);
  todayDate = TuiDay.currentLocal();
  private sub = new Subscription();

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private context: TuiDialogContext<boolean>,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private airportsService: AirportsService,
    private flightsService: FlightsService,
    private fb: FormBuilder,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.seedFormFromStore();
    this.monitorFlightTypeChanges();
    this.monitorFormChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  get flightType() {
    return this.airportForm.get('flightType');
  }

  get departure() {
    return this.airportForm.get('departure');
  }

  get arrival() {
    return this.airportForm.get('arrival');
  }

  get date() {
    return this.airportForm.get('date');
  }

  get passengers() {
    return this.airportForm.get('passengers') as FormControl;
  }

  extractValueFromEvent(event: Event): string | null {
    return (event.target as HTMLInputElement)?.value || null;
  }

  onDepartureSearchChange(searchQuery: string | null): void {
    this.searchDeparture$$.next(searchQuery);
  }

  onArrivalSearchChange(searchQuery: string | null): void {
    this.searchArrival$$.next(searchQuery);
  }

  stringifyAirport(item: Airport | null): string {
    return item ? `${item.city} ${item.iata_code}` : '';
  }

  private ok() {
    this.context.completeWith(true);
  }

  private cancel() {
    this.context.completeWith(false);
  }

  private getAirports(search$$: Subject<string | null>): Observable<Airport[]> {
    return search$$.pipe(
      filter((query) => query !== null && query.length >= FLIGHT_SEARCH_MINIMUM_QUERY_LENGTH),
      debounceTime(FLIGHT_SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((search) => this.airportsService.search(search)),
    );
  }

  private monitorFormChanges(): void {
    this.sub.add(
      this.airportForm.valueChanges.subscribe(() => {
        const { flightType, departure, arrival, date, passengers } = this.airportForm.value;

        if (!this.airportForm.valid || !flightType || !departure || !arrival || !date || !passengers) {
          return;
        }

        let flightDate = '';
        let returnDate;
        if (date instanceof TuiDayRange) {
          flightDate = date.from.toUtcNativeDate().toISOString();
          returnDate = date.to.toUtcNativeDate().toISOString();
        } else {
          flightDate = date.toUtcNativeDate().toISOString();
        }

        const flightSearchData: FlightSearchData = {
          flightType,
          departure,
          arrival,
          flightDate,
          returnDate,
          passengers,
        };

        this.store.dispatch(saveFlightSearch({ flightSearchData }));

        const request: FlightsRequest = {
          departureIATA: flightSearchData.departure.iata_code,
          arrivalIATA: flightSearchData.arrival.iata_code,
          flightDate: flightSearchData.flightDate,
          returnDate: flightSearchData.returnDate,
          adults: flightSearchData.passengers.adults,
          children: flightSearchData.passengers.children,
          infants: flightSearchData.passengers.infants,
        };

        this.sub.add(
          this.flightsService
            .search(request)
            .pipe(
              catchError((err) => {
                this.showErrorAlert(err.message);

                return EMPTY;
              }),
            )
            .subscribe((flights) => {
              this.store.dispatch(saveFlights({ flights }));
            }),
        );
      }),
    );
  }

  private monitorFlightTypeChanges(): void {
    // we need to reset 'date' value if `flightType` was switched
    this.sub.add(
      this.flightType?.valueChanges.subscribe(() => {
        this.airportForm.patchValue({
          date: null,
        });
        this.date?.markAsUntouched();
      }),
    );
  }

  private seedFormFromStore(): void {
    this.sub.add(
      this.flightData$.pipe(take(1)).subscribe((flightData) => {
        if (!flightData) {
          return;
        }

        let date = null;
        if (!flightData.returnDate) {
          date = TuiDay.fromUtcNativeDate(new Date(flightData.flightDate));
        } else {
          date = new TuiDayRange(
            TuiDay.fromUtcNativeDate(new Date(flightData.flightDate)),
            TuiDay.fromUtcNativeDate(new Date(flightData.returnDate)),
          );
        }

        this.airportForm.setValue({
          flightType: flightData.flightType,
          departure: flightData.departure,
          arrival: flightData.arrival,
          date,
          passengers: flightData.passengers,
        });
      }),
    );
  }

  private showErrorAlert(message: string): void {
    this.sub.add(
      this.alerts
        .open(message, {
          label: 'Request error',
          status: TuiNotification.Error,
          autoClose: ALERT_DISPLAY_DURATION,
        })
        .subscribe(),
    );
  }
}
