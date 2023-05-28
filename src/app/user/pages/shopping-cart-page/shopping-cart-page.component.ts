import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Booking } from '@shared/types/booking';
import {
  checkoutBooking,
  prefillBookingData,
  removeBooking,
  storeCurrentBookingId,
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

  constructor(
    private router: Router,
    private readonly store: Store,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  ngOnInit(): void {
    this.bookings$ = this.store.select(selectCurrentBookings);
    this.store.dispatch(storeCurrentBookingId({ id: null }));
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

  showCheckoutAlert(): void {
    this.sub.add(
      this.alerts
        .open('Selected bookings are paid and available on the User Acccount page', { status: TuiNotification.Success })
        .subscribe(),
    );
  }
}
