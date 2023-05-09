import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { mockedFlightsData } from './mockData';
import { Flight } from '@booking/interfaces/flight';

@Component({
  selector: 'air-booking-flights-page',
  templateUrl: './booking-flights-page.component.html',
  styleUrls: ['./booking-flights-page.component.scss'],
})
export class BookingFlightsPageComponent {
  departureAirportName: string = mockedFlightsData.departure[0].departureAirport.name;
  arrivalAirportName: string = mockedFlightsData.departure[0].arrivalAirport.name;
  departureFlights: Flight[] = mockedFlightsData.departure;
  arrivalFlights?: Flight[] = mockedFlightsData.arrival;
  departureFlightIdx: number | null = null;
  arrivalFlightIdx: number | null = null;
  isDepartureConfirmed = false;
  isArrivalConfirmed = !this.arrivalFlights;

  constructor(private router: Router) {}

  onBack(): void {
    // TODO: return to the Flight Search form with previously pre-filled data
    this.router.navigateByUrl('/');
  }

  onContinue(): void {
    // TODO
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
}
