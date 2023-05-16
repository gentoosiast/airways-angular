import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
} from 'rxjs';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AirportsService } from '@core/services/airports.service';
import { Airport } from '@booking/types/airport';
import { Passengers } from '@shared/types/passengers';
import { FlightType } from '@shared/types/flight-type';
import { adultValidator } from '@shared/validators/adultValidator';
import { FLIGHT_SEARCH_MINIMUM_QUERY_LENGTH, FLIGHT_SEARCH_DEBOUNCE_TIME } from '@flight-search/constants';
import { FlightSearchData } from '@shared/types/flight-data';
import { saveFlightSearch, saveFlights } from '@store/actions/flight-data.actions';
import { selectFlightSearchData } from '@store/selectors/flight-data.selectors';
import { FlightsRequest } from '@shared/types/flights-request';
import { FlightsService } from '@core/services/flights.service';
import { ALERT_DISPLAY_DURATION } from '@core/constants/alerts.constants';

@Component({
  selector: 'air-flight-search-page',
  templateUrl: './flight-search-page.component.html',
  styleUrls: ['./flight-search-page.component.scss'],
})
export class FlightSearchPageComponent implements OnInit, OnDestroy {
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
  flightData$ = this.store.select(selectFlightSearchData);
  todayDate = TuiDay.currentLocal();
  private searchDeparture$$ = new Subject<string | null>();
  private searchArrival$$ = new Subject<string | null>();
  airportsDeparture$ = this.getAirports(this.searchDeparture$$);
  airportsArrival$ = this.getAirports(this.searchArrival$$);
  private sub = new Subscription();

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private fb: FormBuilder,
    private airportsService: AirportsService,
    private flightsService: FlightsService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.seedFormFromStore();
    this.monitorFlightTypeChanges();
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

  onSubmit() {
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
          this.router.navigateByUrl('/booking/step-flights');
        }),
    );
  }

  stringifyAirport(item: Airport | null): string {
    return item ? `${item.city} ${item.iata_code}` : '';
  }

  swapDepartureArrival(): void {
    const departure = this.airportForm.get('departure')?.value;
    const arrival = this.airportForm.get('arrival')?.value;

    this.airportForm.patchValue({
      departure: arrival,
      arrival: departure,
    });
  }

  private getAirports(search$$: Subject<string | null>): Observable<Airport[]> {
    return search$$.pipe(
      filter((query) => query !== null && query.length >= FLIGHT_SEARCH_MINIMUM_QUERY_LENGTH),
      debounceTime(FLIGHT_SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap((search) => this.airportsService.search(search)),
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

  private seedFormFromStore() {
    this.sub.add(
      this.flightData$.subscribe((flightData) => {
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
