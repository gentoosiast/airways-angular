import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Booking } from '@shared/types/booking';
import { mockBookingsData } from './mockBookingsData';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';

@Component({
  selector: 'air-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent {
  bookings = mockBookingsData;
  userSettings$ = this.store.select(selectUserSettings);

  constructor(private router: Router, private store: Store) {}

  bookingDetails(booking: Booking) {
    console.log(`Details button flight=${booking.flightNumber}`);
    this.router.navigateByUrl('/booking/step-summary');
    // TODO: pre-fill data on booking summary page via a service
  }
}
