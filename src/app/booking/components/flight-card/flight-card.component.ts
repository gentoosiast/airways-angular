import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Currency, DateFormat } from '@core/types/user-settings';
import { Flight } from '@shared/types/flight';

@Component({
  selector: 'air-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight?: Flight;
  @Input() index = 0;
  @Input() isSelected = false;
  @Input() dateFormat: DateFormat = DateFormat.DD_MM_YYYY;
  @Input() preferredCurrency: Currency = Currency.Euro;
  @Output() flightSelect = new EventEmitter<number>();
  isDisabled = false;
  private todayDate = new Date();

  ngOnInit(): void {
    this.setDisabledStatus();
  }

  getDateFormatForPipe(dateFormat: DateFormat): string {
    switch (dateFormat) {
      case DateFormat.MM_DD_YYYY:
        return 'MMM dd';
      case DateFormat.DD_MM_YYYY:
        return 'dd MMM';
      case DateFormat.YYYY_MM_DD:
        return 'MMM dd';
      default:
        return 'dd MMM';
    }
  }

  onSelectFlight(): void {
    this.flightSelect.emit(this.index);
  }

  private setDisabledStatus(): void {
    if (!this.flight || this.flight.availableSeats === 0 || new Date(this.flight.departureDate) < this.todayDate) {
      this.isDisabled = true;
    }
  }
}
