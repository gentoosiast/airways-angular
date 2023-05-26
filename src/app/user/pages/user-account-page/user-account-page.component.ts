import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from '@shared/types/booking';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { storeIdForDetails } from '@store/actions/current-order.actions';
import { selectCompletedBookings } from '@store/selectors/bookings.selector';

@Component({
  selector: 'air-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.scss'],
})
export class UserAccountPageComponent {
  bookings$: Observable<Array<Booking & { isSelected?: boolean }>> = this.store.select(selectCompletedBookings);
  userSettings$ = this.store.select(selectUserSettings);

  constructor(private router: Router, private store: Store) {}

  bookingDetails(booking: Booking) {
    if (!booking.id) {
      return;
    }
    this.store.dispatch(storeIdForDetails({ id: booking.id }));
    this.router.navigateByUrl('/booking/step-summary');
  }
}
