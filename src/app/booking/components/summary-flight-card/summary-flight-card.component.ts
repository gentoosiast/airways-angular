import { Component, Input } from '@angular/core';
import { Flight } from '@shared/types/flight';
import { Passenger } from '@shared/types/passengers';

@Component({
  selector: 'air-summary-flight-card',
  templateUrl: './summary-flight-card.component.html',
  styleUrls: ['./summary-flight-card.component.scss'],
})
export class SummaryFlightCardComponent {
  @Input() flight?: Flight;
  @Input() passengerData: Passenger[] = [];
}
