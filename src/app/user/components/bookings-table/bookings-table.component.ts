import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { mockBookingsData } from '@user/constants/shopping-cart.constant';

@Component({
  selector: 'air-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
})
export class BookingsTableComponent {
  selectAll = new FormControl(false);
  readonly columns = ['checkbox', 'number', 'flight', 'triptype', 'dates', 'passengers', 'price', 'actions'];
  bookings = mockBookingsData;
}
