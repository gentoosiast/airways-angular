import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { TuiDay } from '@taiga-ui/cdk';
import plur from 'plur';
import { AirportsService } from '@core/services/airports.service';
import { Airport } from '@core/interfaces/airport';
import { Passengers } from '@shared/interfaces/passengers';
import { FlightType } from '@shared/types/flight-type';
import { adultValidator } from '@flight-search/validators/adultValidator';
import { FLIGHT_SEARCH_MINIMUM_QUERY_LENGTH, FLIGHT_SEARCH_DEBOUNCE_TIME } from '@flight-search/constants';

@Component({
  selector: 'air-flight-search-page',
  templateUrl: './flight-search-page.component.html',
  styleUrls: ['./flight-search-page.component.scss'],
})
export class FlightSearchPageComponent implements OnInit, OnDestroy {
  airportForm = this.fb.group({
    flightType: this.fb.control<FlightType | null>('roundtrip', [Validators.required]),
    departure: this.fb.control<string | null>('', [Validators.required]),
    arrival: this.fb.control<string | null>('', [Validators.required]),
    date: this.fb.control<TuiDay | null>(null, [Validators.required]),
    passengers: this.fb.control<Passengers | null>({ adults: 1, children: 0, infants: 0 }, [
      Validators.required,
      adultValidator,
    ]),
  });
  passengerItems = [
    { category: 'adults', description: '14+ years' },
    { category: 'children', description: '2-14 years' },
    { category: 'infants', description: '0-2 years' },
  ];
  todayDate = TuiDay.currentLocal();
  private searchDeparture$$ = new Subject<string | null>();
  private searchArrival$$ = new Subject<string | null>();
  airportsDeparture$ = this.getAirports(this.searchDeparture$$);
  airportsArrival$ = this.getAirports(this.searchArrival$$);
  private sub = new Subscription();

  constructor(private fb: FormBuilder, private airportsService: AirportsService) {}

  ngOnInit(): void {
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
    return this.airportForm.get('passengers');
  }

  modifyPassengers(type: string, delta: number) {
    const passengers = this.airportForm.get('passengers')?.value;

    if (passengers && type in passengers) {
      passengers[type] += delta;
      if (passengers[type] < 0) {
        passengers[type] = 0;
      }

      this.airportForm.patchValue({
        passengers,
      });
    }
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
    // TODO
  }

  stringifyAirport(item: Airport | null): string {
    return item ? `${item.city} ${item.iata_code}` : '';
  }

  stringifyPassengers(passengers: Passengers): string {
    return `${passengers.adults} ${plur('Adult', passengers.adults)}, ${passengers.children} ${plur(
      'Child',
      passengers.children,
    )}, ${passengers.infants} ${plur('Infant', passengers.infants)}`;
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
}
