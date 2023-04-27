import { Component, Input } from '@angular/core';
import { Flight } from '@booking/interfaces/flight';

@Component({
  selector: 'air-flight-selector',
  templateUrl: './flight-selector.component.html',
  styleUrls: ['./flight-selector.component.scss'],
})
export class FlightSelectorComponent {
  @Input() flights: Flight[] = [];
  displayItemsCount = 5; // TODO: value will depend of available screen space
  index = 0;
  selectedIndex?: number;

  switchSelectedCard(index: number) {
    this.selectedIndex = index;
  }
}
