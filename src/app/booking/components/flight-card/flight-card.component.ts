import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Currency } from '@core/types/user-settings';
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
  @Input() preferredCurrency: Currency = Currency.Euro;
  @Output() flightSelect = new EventEmitter<number>();
  isDisabled = false;
  private todayDate = new Date();

  ngOnInit(): void {
    this.setDisabledStatus();
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
