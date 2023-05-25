import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Currency, DateFormat } from '@core/types/user-settings';
import { Flight } from '@shared/types/flight';

@Component({
  selector: 'air-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent {
  @Input() flight?: Flight;
  @Input() isDeparture = true;
  @Input() isFlightSelected = false;
  @Input() dateFormat: DateFormat = DateFormat.DD_MM_YYYY;
  @Input() preferredCurrency: Currency = Currency.Euro;
  @Output() confirmFlight = new EventEmitter<boolean>();

  getFlightIcon(): string {
    return this.isDeparture ? '/assets/icons/flight-type-right.svg' : '/assets/icons/flight-type-left.svg';
  }

  onConfirmFlight(isConfirmed: boolean): void {
    this.confirmFlight.emit(isConfirmed);
  }
}
