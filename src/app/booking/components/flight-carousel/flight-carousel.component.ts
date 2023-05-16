import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Flight } from '@booking/types/flight';

@Component({
  selector: 'air-flight-carousel',
  templateUrl: './flight-carousel.component.html',
  styleUrls: ['./flight-carousel.component.scss'],
})
export class FlightCarouselComponent implements OnInit {
  @Input() flights: Flight[] = [];
  @Input() isVisible = true;
  @Output() selectFlight = new EventEmitter<number>();
  displayItemsCount = 5; // TODO: value will depend on available screen space
  index = 0;
  selectedIndex?: number;

  ngOnInit(): void {
    this.index = Math.floor(this.flights.length / 2);
  }

  onSelectFlight(index: number): void {
    this.selectedIndex = index;
    this.selectFlight.emit(index);
  }
}
