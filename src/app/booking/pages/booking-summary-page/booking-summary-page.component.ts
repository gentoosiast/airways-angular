import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Booking } from '@shared/types/booking';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { PassengerCategory, Passengers } from '@shared/types/passengers';
import { addBooking, storeIdForDetails } from '@store/actions/current-order.actions';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { selectBooking } from '@store/selectors/bookings.selector';
import { Currency, DateFormat } from '@core/types/user-settings';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnInit, OnDestroy {
  booking$: Observable<Booking | null> = this.store.select(selectBooking);
  booking?: Booking | null = null;
  passengerCategories = [] as Array<PassengerCategory>;
  dateFormat: DateFormat = DateFormat.DD_MM_YYYY;
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
    this.sub.add(
      this.booking$.subscribe((booking: Booking | null) => {
        if (booking) {
          this.booking = booking;
          this.passengerCategories = Object.keys(booking.passengers) as Array<PassengerCategory>;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.store.dispatch(storeIdForDetails({ id: null }));
  }

  getCategoryCount(category: keyof Passengers): number {
    return this.booking?.passengerData.filter((pas) => pas.category === category).length || 0;
  }

  getPriceForPassengerCategory(category: keyof Passengers): number {
    return this.booking
      ? this.booking?.passengers[category] *
          (this.booking.price[category].fare[this.preferredCurrency] +
            this.booking.price[category].tax[this.preferredCurrency])
      : 0;
  }

  getFareForPassengerCategory(category: keyof Passengers): number {
    return this.booking
      ? this.booking.passengers[category] * this.booking.price[category].fare[this.preferredCurrency]
      : 0;
  }

  getTaxForPassengerCategory(category: keyof Passengers): number {
    return this.booking
      ? this.booking.passengers[category] * this.booking.price[category].tax[this.preferredCurrency]
      : 0;
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
    if (!this.booking) {
      return;
    }
    if (!this.booking.id) {
      this.booking.id = nanoid();
    }
    this.store.dispatch(addBooking({ booking: this.booking }));
  }

  private monitorCurrencySettings(): void {
    this.sub.add(
      this.userSettings$.subscribe((settings) => {
        this.dateFormat = settings.dateFormat;
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
