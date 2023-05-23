import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { nanoid } from 'nanoid';
import { mockBookingData } from './mockBookingData';
import { PassengerCategory, Passengers } from '@shared/types/passengers';
import { addBooking } from '@store/actions/current-order.actions';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { Currency } from '@core/types/user-settings';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnInit, OnDestroy {
  booking = mockBookingData;
  passengerCategories = Object.keys(this.booking.passengers) as Array<PassengerCategory>;
  preferredCurrency: Currency = Currency.Euro;
  userSettings$ = this.store.select(selectUserSettings);

  private sub = new Subscription();

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly router: Router,
    private readonly store: Store,
  ) {}

  ngOnInit(): void {
    this.monitorCurrencySettings();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getPriceForPassengerCategory(category: keyof Passengers): number {
    return (
      this.booking.passengers[category] *
      (this.booking.price[category].fare[this.preferredCurrency] +
        this.booking.price[category].tax[this.preferredCurrency])
    );
  }

  getFareForPassengerCategory(category: keyof Passengers): number {
    return this.booking.passengers[category] * this.booking.price[category].fare[this.preferredCurrency];
  }

  getTaxForPassengerCategory(category: keyof Passengers): number {
    return this.booking.passengers[category] * this.booking.price[category].tax[this.preferredCurrency];
  }

  getTotalPrice(): number {
    return this.passengerCategories.reduce((sum, category) => sum + this.getPriceForPassengerCategory(category), 0);
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

  private monitorCurrencySettings(): void {
    this.sub.add(
      this.userSettings$.subscribe((settings) => {
        this.preferredCurrency = settings.currency;
      }),
    );
  }

  private showAddToCartAlert(): void {
    this.sub.add(
      this.alerts
        .open('Your booking is available in the shopping cart', { status: TuiNotification.Success })
        .subscribe(),
    );
  }
}
