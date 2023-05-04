import { Component } from '@angular/core';
import { mockBookingData } from './mockBookingData';

@Component({
  selector: 'air-booking-summary-page',
  templateUrl: './booking-summary-page.component.html',
  styleUrls: ['./booking-summary-page.component.scss'],
})
export class BookingSummaryPageComponent {
  booking = mockBookingData;
}
