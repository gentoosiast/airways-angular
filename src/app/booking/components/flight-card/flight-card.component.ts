import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '@booking/interfaces/flight';

@Component({
  selector: 'air-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss'],
})
export class FlightCardComponent {
  @Input() flight?: Flight;
  @Input() index = 0;
  @Input() isSelected = false;

  @Output() cardSelect = new EventEmitter<number>();

  onSelectCard() {
    this.cardSelect.emit(this.index);
  }
}
