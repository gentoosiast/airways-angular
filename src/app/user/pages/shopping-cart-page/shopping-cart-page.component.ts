import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Booking } from '@shared/types/booking';
import { removeBooking } from '@store/actions/current-order.actions';
import { selectCurrentOrder } from 'src/app/store/selectors/bookings.selector';
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
    this.bookings$ = this.store.select(selectCurrentOrder);
  }

  removeBooking(booking: Booking) {
    if (booking.id) {
      this.store.dispatch(removeBooking({ id: booking.id }));
    }
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
