import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from '@shared/types/booking';
import { removeBooking, storeIdForDetails } from '@store/actions/current-order.actions';
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
  }

  removeBooking(booking: Booking) {
    if (booking.id) {
      this.store.dispatch(removeBooking({ id: booking.id }));
    }
  }

  editBooking(booking: Booking) {
    console.log(`Edit button flight=${booking.flight.flightNumber}`);
    this.router.navigateByUrl('/booking');
    // TODO: pre-fill data on booking page via a service
  }

  bookingDetails(booking: Booking) {
    if (!booking.id) {
      return;
    }
    this.store.dispatch(storeIdForDetails({ id: booking.id }));
    this.router.navigateByUrl('/booking/step-summary');
  }
}
