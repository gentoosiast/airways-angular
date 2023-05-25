import { Component, Input } from '@angular/core';
import { DateFormat } from '@core/types/user-settings';

@Component({
  selector: 'air-date-time-widget',
  templateUrl: './date-time-widget.component.html',
  styleUrls: ['./date-time-widget.component.scss'],
})
export class DateTimeWidgetComponent {
  @Input() airportName = '';
  @Input() date = '';
  @Input() dateFormat: DateFormat = DateFormat.DD_MM_YYYY;
  @Input() isDeparture = true;

  getFormatForDatePipe(dateFormat: DateFormat): string {
    switch (dateFormat) {
      case DateFormat.MM_DD_YYYY:
        return 'EEE, MMM d yyyy';
      case DateFormat.DD_MM_YYYY:
        return 'EEE, d MMM yyyy';
      case DateFormat.YYYY_MM_DD:
        return 'EEE, yyyy MMM d';
      default:
        return 'EEE, d MMM yyyy';
    }
  }
}
