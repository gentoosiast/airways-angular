import { Component } from '@angular/core';
import { flights } from '../mockData';

@Component({
  selector: 'air-booking-flights-page',
  templateUrl: './booking-flights-page.component.html',
  styleUrls: ['./booking-flights-page.component.scss'],
})
export class BookingFlightsPageComponent {
  flights = flights;
  switchedFlightIdx = 0;
  isSelected = false;

  onSelectFlight(state: boolean) {
    this.isSelected = state;
  }

  onSwitchFlight(flightIdx: number) {
    this.switchedFlightIdx = flightIdx;
  }
}
