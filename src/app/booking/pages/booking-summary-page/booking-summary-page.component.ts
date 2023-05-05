import { Component } from '@angular/core';
import { mockBookingData } from './mockBookingData';
import { mockPaymentData } from './mockPaymentData';
import { PassengerCategory, Passengers } from '@shared/models/booking.model';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent {
  booking = mockBookingData;
  paymentDetails = mockPaymentData;
  passengerCategories = Object.entries(this.booking.passengers) as [PassengerCategory, number][];

  getPriceForPassengerCategory(category: keyof Passengers): number {
    const passengersCount = this.passengerCategories.find((element) => element[0] === category);
    return passengersCount
      ? passengersCount[1] *
          (this.paymentDetails.price[category].fare +
            this.paymentDetails.price[category].serviceCharge +
            this.paymentDetails.price[category].tax)
      : 0;
  }

  getFareForPassengerCategory(category: keyof Passengers): number {
    const passengersCount = this.passengerCategories.find((element) => element[0] === category);
    return passengersCount ? passengersCount[1] * this.paymentDetails.price[category].fare : 0;
  }

  getTaxForPassengerCategory(category: keyof Passengers): number {
    const passengersCount = this.passengerCategories.find((element) => element[0] === category);
    return passengersCount
      ? passengersCount[1] *
          (this.paymentDetails.price[category].serviceCharge + this.paymentDetails.price[category].tax)
      : 0;
  }

  getTotalPrice(): number {
    return this.passengerCategories.reduce(
      (sum, curCategory) =>
        sum +
        curCategory[1] *
          (this.paymentDetails.price[curCategory[0]].fare +
            this.paymentDetails.price[curCategory[0]].serviceCharge +
            this.paymentDetails.price[curCategory[0]].tax),
      0,
    );
  }
}
