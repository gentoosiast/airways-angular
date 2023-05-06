import { Component, Input } from '@angular/core';

@Component({
  selector: 'air-date-time-widget',
  templateUrl: './date-time-widget.component.html',
  styleUrls: ['./date-time-widget.component.scss'],
})
export class DateTimeWidgetComponent {
  @Input() airportName = '';
  @Input() date = '';
  @Input() isDeparture = true;
}
