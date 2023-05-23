import { Component, Input } from '@angular/core';
import { DateFormat } from '@core/types/user-settings';
import { Flight } from '@shared/types/flight';
import { Passenger } from '@shared/types/passengers';

@Component({
  selector: 'air-summary-flight-card',
  templateUrl: './summary-flight-card.component.html',
  styleUrls: ['./summary-flight-card.component.scss'],
})
export class SummaryFlightCardComponent {
  @Input() dateFormat: DateFormat = DateFormat.DD_MM_YYYY;
  @Input() flight?: Flight;
  @Input() passengerData: Passenger[] = [];

  getFormatForDatePipe(dateFormat: DateFormat): string {
    switch (dateFormat) {
      case DateFormat.MM_DD_YYYY:
        return 'EEEE, MMMM d, y';
      case DateFormat.DD_MM_YYYY:
        return 'EEEE, d MMMM, y';
      case DateFormat.YYYY_MM_DD:
        return 'EEEE, MMMM d, y';
      default:
        return 'EEEE, MMMM d, y';
    }
  }
}
