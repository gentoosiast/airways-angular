import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '@shared/models/booking.model';
import { mockBookingsData } from './mockBookingsData';

@Component({
  selector: 'air-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent {
  bookings = mockBookingsData;

  constructor(private router: Router) {}

  bookingDetails(booking: Booking) {
    console.log(`Details button flight=${booking.flightNumber}`);
    this.router.navigateByUrl('/booking/step-summary');
    // TODO: pre-fill data on booking summary page via a service
  }
}
