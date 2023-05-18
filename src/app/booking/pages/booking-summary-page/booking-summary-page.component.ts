import { Component } from '@angular/core';
import { mockBookingData } from './mockBookingData';
import { mockPaymentData } from './mockPaymentData';
import { PassengerCategory, Passengers } from '@shared/types/passengers';
import { Router } from '@angular/router';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent {
  booking = mockBookingData;
  paymentDetails = mockPaymentData;
  passengerCategories = Object.keys(this.booking.passengers) as Array<PassengerCategory>;

  constructor(private router: Router) {}

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
}
