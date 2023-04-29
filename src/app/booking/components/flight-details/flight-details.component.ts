import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '@booking/interfaces/flight';

@Component({
  selector: 'air-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent {
  @Input() flight?: Flight;
  @Input() isFlightSelected = false;
  @Output() selectFlight = new EventEmitter<boolean>();

  onSelectFlight(isSelected: boolean) {
    this.selectFlight.emit(isSelected);
  }
}
