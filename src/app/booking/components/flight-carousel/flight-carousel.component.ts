import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Flight } from '@shared/types/flight';
import { UserSettings } from '@shared/types/user-settings';

@Component({
  selector: 'air-flight-carousel',
  templateUrl: './flight-carousel.component.html',
  styleUrls: ['./flight-carousel.component.scss'],
})
export class FlightCarouselComponent implements OnInit {
  @Input() flights: Flight[] = [];
  @Input() isVisible = true;
  @Input() userSettings$: Observable<UserSettings> = EMPTY;
  @Input() displayItemsCount = 0;
  @Output() selectFlight = new EventEmitter<number>();
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
