import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Booking } from '@shared/types/booking';
import {
  checkoutBooking,
  clearBookingData,
  prefillBookingData,
  removeBooking,
} from '@store/actions/current-order.actions';
import { selectCurrentBookings } from 'src/app/store/selectors/bookings.selector';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';

@Component({
  selector: 'air-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  bookings$!: Observable<Array<Booking>>;
  userSettings$ = this.store.select(selectUserSettings);

  private sub = new Subscription();

  constructor(private router: Router, private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(clearBookingData());
    this.bookings$ = this.store.select(selectCurrentBookings);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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

  checkout(id: string) {
    this.store.dispatch(checkoutBooking({ id }));
  }
}
