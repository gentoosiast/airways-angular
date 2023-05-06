import { NgModule } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';
import { CommonModule } from '@angular/common';
import { TuiSvgModule, TuiButtonModule } from '@taiga-ui/core';
import { TuiCarouselModule } from '@taiga-ui/kit';
import { BookingFlightsPageComponent } from './pages/booking-flights-page/booking-flights-page.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { FlightCarouselComponent } from './components/flight-carousel/flight-carousel.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { SeatsDirective } from './directives/seats.directive';
import { HumanReadableTimePipe } from './pipes/human-readable-time.pipe';
import { FlightConnectionsPipe } from './pipes/flight-connections.pipe';
import { DateTimeWidgetComponent } from './components/date-time-widget/date-time-widget.component';

@NgModule({
  declarations: [
    BookingFlightsPageComponent,
    FlightCardComponent,
    FlightCarouselComponent,
    FlightDetailsComponent,
    SeatsDirective,
    HumanReadableTimePipe,
    FlightConnectionsPipe,
    DateTimeWidgetComponent,
  ],
  imports: [CommonModule, BookingRoutingModule, TuiSvgModule, TuiButtonModule, TuiCarouselModule],
})
export class BookingModule {}
