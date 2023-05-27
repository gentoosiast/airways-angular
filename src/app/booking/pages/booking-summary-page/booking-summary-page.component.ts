import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Booking } from '@shared/types/booking';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { nanoid } from 'nanoid';
import { PassengerCategory, Passengers } from '@shared/types/passengers';
import { addBooking } from '@store/actions/current-order.actions';
import { selectUserSettings } from '@store/selectors/user-settings.selectors';
import { selectBookingFromPrevSteps } from '@store/selectors/bookings.selector';
import { Currency, DateFormat } from '@core/types/user-settings';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent implements OnInit, OnDestroy {
  booking$: Observable<Booking | null> = this.store.select(selectBookingFromPrevSteps);
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
          this.passengerCategories = Object.keys(booking.passengers) as Array<PassengerCategory>;
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCategoryCount(booking: Booking, category: keyof Passengers): number {
    return booking.passengerData.filter((pas) => pas.category === category).length;
  }

  getPriceForPassengerCategory(booking: Booking, category: keyof Passengers): number {
    return (
      booking.passengers[category] *
      (booking.price[category].fare[this.preferredCurrency] + booking.price[category].tax[this.preferredCurrency])
    );
  }

  getFareForPassengerCategory(booking: Booking, category: keyof Passengers): number {
    return booking.passengers[category] * booking.price[category].fare[this.preferredCurrency];
  }

  getTaxForPassengerCategory(booking: Booking, category: keyof Passengers): number {
    return booking.passengers[category] * booking.price[category].tax[this.preferredCurrency];
  }

  getTotalPrice(booking: Booking): number {
    return this.passengerCategories.reduce(
      (sum, category) => sum + this.getPriceForPassengerCategory(booking, category),
      0,
    );
  }

  onBackButton() {
    this.router.navigateByUrl('/booking/step-passengers');
  }

  onReturnToAccount() {
    this.router.navigateByUrl('/user/account');
  }

  onAddToCart(booking: Booking) {
    this.addBookingToCart(booking);
    this.showAddToCartAlert();
  }

  onBuyNow(booking: Booking) {
    this.addBookingToCart(booking);
    this.router.navigateByUrl('/user/cart');
  }

  private addBookingToCart(booking: Booking) {
    if (!booking.id) {
      booking.id = nanoid();
    }
    this.store.dispatch(addBooking({ booking }));
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
