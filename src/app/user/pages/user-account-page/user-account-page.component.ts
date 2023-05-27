import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from '@shared/types/booking';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { selectCompletedBookings } from '@store/selectors/bookings.selector';
import { prefillBookingData, storeCurrentBookingId } from '@store/actions/current-order.actions';

@Component({
  selector: 'air-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent implements OnInit {
  bookings$: Observable<Array<Booking & { isSelected?: boolean }>> = this.store.select(selectCompletedBookings);
  userSettings$ = this.store.select(selectUserSettings);

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(storeCurrentBookingId({ id: null }));
  }

  bookingDetails(booking: Booking) {
    if (!booking.id) {
      return;
    }
    this.store.dispatch(prefillBookingData({ booking }));
    this.router.navigateByUrl('/booking/step-summary');
  }
}
