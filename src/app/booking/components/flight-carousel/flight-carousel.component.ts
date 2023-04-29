import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Flight } from '@booking/interfaces/flight';

@Component({
  selector: 'air-flight-carousel',
  templateUrl: './flight-carousel.component.html',
  styleUrls: ['./flight-carousel.component.scss'],
})
export class FlightCarouselComponent {
  @Input() flights: Flight[] = [];
  @Input() isVisible = true;
  @Output() switchFlight = new EventEmitter<number>();
  displayItemsCount = 5; // TODO: value will depend on available screen space
  index = 0;
  selectedIndex?: number;

  switchSelectedCard(index: number) {
    this.selectedIndex = index;
    this.switchFlight.emit(index);
  }
}
