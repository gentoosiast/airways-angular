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

@NgModule({
  declarations: [BookingPassengersPageComponent, PassengerContactsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BookingRoutingModule,
    TuiButtonModule,
    TuiErrorModule,
    TuiGroupModule,
    TuiHintModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiInputDateModule,
    TuiInputPhoneInternationalModule,
    TuiRadioBlockModule,
    TuiSortCountriesPipeModule,
    TuiSvgModule,
    TuiTextfieldControllerModule,
    TuiToggleModule,
  ],
})
export class BookingModule {}
