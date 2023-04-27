import { NgModule } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';
import { CommonModule } from '@angular/common';
import { TuiSvgModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { BookingFlightsPageComponent } from './pages/booking-flights-page/booking-flights-page.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { FlightSelectorComponent } from './components/flight-selector/flight-selector.component';

@NgModule({
  declarations: [BookingFlightsPageComponent, FlightCardComponent, FlightSelectorComponent],
  imports: [CommonModule, BookingRoutingModule, TuiSvgModule, TuiButtonModule, TuiCarouselModule],
})
export class BookingModule {}
