import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { selectFlightSearchData } from '@store/selectors/flight-data.selectors';
import { FlightsResponse } from '@booking/types/flights-response';
import { FlightsRequest } from '@booking/types/flights-request';
import { FlightsService } from '@core/services/flights.service';
import { ALERT_DISPLAY_DURATION } from '@core/constants/alerts.constants';

@Component({
  selector: 'air-booking-flights-page',
  templateUrl: './booking-flights-page.component.html',
  styleUrls: ['./booking-flights-page.component.scss'],
})
export class BookingFlightsPageComponent implements OnInit, OnDestroy {
  flightSearchData$ = this.store.select(selectFlightSearchData);
  flightsData$?: Observable<FlightsResponse>;
  departureFlightIdx: number | null = null;
  arrivalFlightIdx: number | null = null;
  isDepartureConfirmed = false;
  isArrivalConfirmed = false;
  private sub = new Subscription();

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private router: Router,
    private store: Store,
    private flightsService: FlightsService,
  ) {}

  ngOnInit(): void {
    this.findFlights();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBackButton(): void {
    this.router.navigateByUrl('/');
  }

  onContinueButton(): void {
    // TODO: add data to the store
    this.router.navigateByUrl('/booking/step-passengers');
  }

  onConfirmDepartureFlight(isConfirmed: boolean): void {
    this.isDepartureConfirmed = isConfirmed;
  }

  onConfirmArrivalFlight(isConfirmed: boolean): void {
    this.isArrivalConfirmed = isConfirmed;
  }

  onSelectDepartureFlight(flightIdx: number): void {
    this.departureFlightIdx = flightIdx;
  }

  onSelectArrivalFlight(flightIdx: number): void {
    this.arrivalFlightIdx = flightIdx;
  }

  private findFlights(): void {
    this.sub.add(
      this.flightSearchData$.subscribe((flightSearchData) => {
        if (!flightSearchData) {
          return;
        }

        const request: FlightsRequest = {
          departureIATA: flightSearchData.departure.iata_code,
          arrivalIATA: flightSearchData.arrival.iata_code,
          flightDate: flightSearchData.flightDate,
          returnDate: flightSearchData.returnDate,
          adults: flightSearchData.passengers.adults,
          children: flightSearchData.passengers.children,
          infants: flightSearchData.passengers.infants,
        };

        this.flightsData$ = this.flightsService.search(request).pipe(
          catchError((err) => {
            this.showErrorAlert(err.message);

            return EMPTY;
          }),
        );
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
