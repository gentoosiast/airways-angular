import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiBreakpointService } from '@taiga-ui/core';
import { selectFlights } from '@store/selectors/flight-data.selectors';
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
  departureFlightIdx: number | null = null;
  arrivalFlightIdx: number | null = null;
  isDepartureConfirmed = false;
  isArrivalConfirmed = false;
  carouselItemsCount = 0;
  userSettings$ = this.store.select(selectUserSettings);

  private sub = new Subscription();

  constructor(
    @Inject(TuiBreakpointService)
    private readonly breakpoint$: TuiBreakpointService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.flightsData$ = this.store.select(selectFlights);
    this.reactToBreakpointChange();
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
    this.sub.add(
      this.flightsData$
        ?.pipe(
          tap((flightsData) => {
            if (this.departureFlightIdx) {
              this.store.dispatch(saveSelectedFlights({ flight: flightsData?.flights[this.departureFlightIdx] }));
            }
          }),
        )
        .subscribe(),
    );
  }

  onConfirmArrivalFlight(isConfirmed: boolean): void {
    this.isArrivalConfirmed = isConfirmed;
    this.sub.add(
      this.flightsData$
        ?.pipe(
          tap((flightsData) => {
            if (this.arrivalFlightIdx && flightsData?.returnFlights) {
              this.store.dispatch(
                saveSelectedFlights({ returnFlight: flightsData?.returnFlights[this.arrivalFlightIdx] }),
              );
            }
          }),
        )
        .subscribe(),
    );
  }

  onSelectDepartureFlight(flightIdx: number): void {
    this.departureFlightIdx = flightIdx;
  }

  onSelectArrivalFlight(flightIdx: number): void {
    this.arrivalFlightIdx = flightIdx;
  }

  private reactToBreakpointChange() {
    this.sub.add(
      this.breakpoint$.subscribe((breakpoint) => {
        switch (breakpoint) {
          case 'desktopLarge':
            this.carouselItemsCount = 6;
            break;
          case 'desktopSmall':
            this.carouselItemsCount = 4;
            break;
          case 'mobile':
            this.carouselItemsCount = 3;
            break;
          default:
        }
      }),
    );
  }
}
