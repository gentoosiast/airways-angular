import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from '@shared/types/booking';
import { prefillBookingData, removeBooking, storeCurrentBookingId } from '@store/actions/current-order.actions';
import { selectCurrentBookings } from 'src/app/store/selectors/bookings.selector';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';

@Component({
  selector: 'air-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent implements OnInit {
  bookings$!: Observable<Array<Booking & { isSelected?: boolean }>>;
  userSettings$ = this.store.select(selectUserSettings);

  constructor(private router: Router, private readonly store: Store) {}

  ngOnInit(): void {
    this.bookings$ = this.store.select(selectCurrentBookings);
    this.store.dispatch(storeCurrentBookingId({ id: null }));
  }

  removeBooking(booking: Booking) {
    if (booking.id) {
      this.store.dispatch(removeBooking({ id: booking.id }));
    }
  }

  editBooking(booking: Booking) {
    this.store.dispatch(prefillBookingData({ booking }));
    this.router.navigateByUrl('/booking');
  }

  bookingDetails(booking: Booking) {
    if (!booking.id) {
      return;
    }
    this.store.dispatch(prefillBookingData({ booking }));
    this.router.navigateByUrl('/booking/step-summary');
  }
}
