import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { nanoid } from 'nanoid';
import { mockBookingData } from './mockBookingData';
import { mockPaymentData } from './mockPaymentData';
import { PassengerCategory, Passengers } from '@shared/types/passengers';
import { addBooking } from '@store/actions/current-order.actions';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnDestroy {
  booking = mockBookingData;
  paymentDetails = mockPaymentData;
  passengerCategories = Object.keys(this.booking.passengers) as Array<PassengerCategory>;

  private sub = new Subscription();

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getPriceForPassengerCategory(category: keyof Passengers): number {
    return (
      this.booking.passengers[category] *
      (this.paymentDetails.price[category].fare +
        this.paymentDetails.price[category].serviceCharge +
        this.paymentDetails.price[category].tax)
    );
  }

  getFareForPassengerCategory(category: keyof Passengers): number {
    return this.booking.passengers[category] * this.paymentDetails.price[category].fare;
  }

  getTaxForPassengerCategory(category: keyof Passengers): number {
    return (
      this.booking.passengers[category] *
      (this.paymentDetails.price[category].serviceCharge + this.paymentDetails.price[category].tax)
    );
  }

  getTotalPrice(): number {
    return this.passengerCategories.reduce(
      (sum, category) =>
        sum +
        this.booking.passengers[category] *
          (this.paymentDetails.price[category].fare +
            this.paymentDetails.price[category].serviceCharge +
            this.paymentDetails.price[category].tax),
      0,
    );
  }

  onBackButton() {
    this.router.navigateByUrl('/booking/step-passengers');
  }

  onAddToCart() {
    this.addBookingToCart();
    this.showAddToCartAlert();
  }

  onBuyNow() {
    this.addBookingToCart();
    this.router.navigateByUrl('/user/cart');
  }

  private addBookingToCart() {
    if (!this.booking.id) {
      this.booking.id = nanoid();
    }
    this.store.dispatch(addBooking({ booking: this.booking }));
  }

  private showAddToCartAlert(): void {
    this.sub.add(
      this.alerts
        .open('Your booking is available in the shopping cart', { status: TuiNotification.Success })
        .subscribe(),
    );
  }
}
