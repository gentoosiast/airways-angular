import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Booking } from '@shared/models/booking.model';
import { mockBookingsData } from './mockBookingsData';

@Component({
  selector: 'air-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent {
  bookings = mockBookingsData;

  constructor(private router: Router) {}

  removeBooking(booking: Booking) {
    this.bookings = this.bookings.filter((item) => item !== booking);
    // TODO: remove the booking via service
  }

  editBooking(booking: Booking) {
    console.log(`Edit button flight=${booking.flightNumber}`);
    this.router.navigateByUrl('/booking');
    // TODO: pre-fill data on booking page via a service
  }

  bookingDetails(booking: Booking) {
    console.log(`Details button flight=${booking.flightNumber}`);
    this.router.navigateByUrl('/booking/step-summary');
    // TODO: pre-fill data on booking summary page via a service
  }
}
