import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlightsPageComponent } from './pages/booking-flights-page/booking-flights-page.component';
import { BookingPassengersPageComponent } from './pages/booking-passengers-page/booking-passengers-page.component';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';
import { authGuardFn } from '@user/guards/auth.guard';
import { bookingFlightsGuardFn } from './guards/booking-flights.guard';
import { bookingPassengersGuardFn } from './guards/booking-passengers.guard';
import { bookingSummaryGuardFn } from './guards/booking-summary.guard';

const routes: Routes = [
  { path: '', redirectTo: 'step-flights', pathMatch: 'full' },
  { path: 'step-flights', component: BookingFlightsPageComponent, canMatch: [bookingFlightsGuardFn] },
  {
    path: 'step-passengers',
    component: BookingPassengersPageComponent,
    canMatch: [authGuardFn, bookingPassengersGuardFn],
  },
  { path: 'step-summary', component: BookingSummaryPageComponent, canMatch: [authGuardFn, bookingSummaryGuardFn] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
