import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingFlightsPageComponent } from './pages/booking-flights-page/booking-flights-page.component';
import { BookingPassengersPageComponent } from './pages/booking-passengers-page/booking-passengers-page.component';
import { BookingSummaryPageComponent } from './pages/booking-summary-page/booking-summary-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'step-flights', pathMatch: 'full' },
  { path: 'step-flights', component: BookingFlightsPageComponent },
  { path: 'step-passengers', component: BookingPassengersPageComponent },
  { path: 'step-summary', component: BookingSummaryPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
