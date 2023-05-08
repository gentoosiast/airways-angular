import { NgModule } from '@angular/core';
import { BookingRoutingModule } from './booking-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiGroupModule,
  TuiHintModule,
  TuiSvgModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
  TuiCarouselModule,
  TuiInputModule,
  TuiInputCountModule,
  TuiInputDateModule,
  TuiInputPhoneInternationalModule,
  TuiRadioBlockModule,
  TuiSortCountriesPipeModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { BookingPassengersPageComponent } from './pages/booking-passengers-page/booking-passengers-page.component';
import { PassengerContactsComponent } from './components/passenger-contacts/passenger-contacts.component';
import { BookingFlightsPageComponent } from './pages/booking-flights-page/booking-flights-page.component';
import { FlightCardComponent } from './components/flight-card/flight-card.component';
import { FlightCarouselComponent } from './components/flight-carousel/flight-carousel.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { SeatsDirective } from './directives/seats.directive';
import { HumanReadableTimePipe } from './pipes/human-readable-time.pipe';
import { FlightConnectionsPipe } from './pipes/flight-connections.pipe';
import { DateTimeWidgetComponent } from './components/date-time-widget/date-time-widget.component';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    BookingPassengersPageComponent,
    PassengerContactsComponent,
    BookingFlightsPageComponent,
    FlightCardComponent,
    FlightCarouselComponent,
    FlightDetailsComponent,
    SeatsDirective,
    HumanReadableTimePipe,
    FlightConnectionsPipe,
    DateTimeWidgetComponent,
    BookingSummaryPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookingRoutingModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiCarouselModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputPhoneInternationalModule,
    TuiRadioBlockModule,
    TuiSortCountriesPipeModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
    SharedModule,
  ],
})
export class BookingModule {}
