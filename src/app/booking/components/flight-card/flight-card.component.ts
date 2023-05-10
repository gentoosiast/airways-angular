import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Flight } from '@booking/types/flight';

@Component({
  selector: 'air-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent implements OnInit {
  @Input() flight?: Flight;
  @Input() index = 0;
  @Input() isSelected = false;
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
