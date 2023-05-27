import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFlights, selectSelectedFlights } from '@store/selectors/flight-data.selectors';
import { Flights } from '@shared/types/flights';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { saveSelectedFlights } from '@store/actions/flight-data.actions';

@Component({
  selector: 'air-booking-flights-page',
  templateUrl: './booking-flights-page.component.html',
  styleUrls: ['./booking-flights-page.component.scss'],
})
export class BookingFlightsPageComponent implements OnInit, OnDestroy {
  flightsData$?: Observable<Flights | null>;
  selectedFlights$?: Observable<{ flightIdx?: number; returnFlightIdx?: number } | null>;
  departureFlightIdx: number | null = null;
  arrivalFlightIdx: number | null = null;
  isDepartureConfirmed = false;
  isArrivalConfirmed = false;
  userSettings$ = this.store.select(selectUserSettings);

  private sub = new Subscription();

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.flightsData$ = this.store.select(selectFlights);
    this.selectedFlights$ = this.store.select(selectSelectedFlights);

    this.sub.add(
      this.selectedFlights$.subscribe((selectedFlights) => {
        this.departureFlightIdx = selectedFlights?.flightIdx || null;
        this.arrivalFlightIdx = selectedFlights?.returnFlightIdx || null;
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBackButton(): void {
    this.router.navigateByUrl('/');
  }

  onContinueButton(): void {
    this.router.navigateByUrl('/booking/step-passengers');
  }

  onConfirmDepartureFlight(isConfirmed: boolean): void {
    this.isDepartureConfirmed = isConfirmed;
    if (this.departureFlightIdx) {
      this.store.dispatch(saveSelectedFlights({ flightIdx: this.departureFlightIdx }));
    }
  }

  onConfirmArrivalFlight(isConfirmed: boolean): void {
    this.isArrivalConfirmed = isConfirmed;
    if (this.arrivalFlightIdx) {
      this.store.dispatch(saveSelectedFlights({ returnFlightIdx: this.arrivalFlightIdx }));
    }
  }

  onSelectDepartureFlight(flightIdx: number): void {
    this.departureFlightIdx = flightIdx;
  }

  onSelectArrivalFlight(flightIdx: number): void {
    this.arrivalFlightIdx = flightIdx;
  }
}
