import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingModel } from '@shared/models/booking-data.model';
import { mockBookingsData } from '@user/constants/shopping-cart.constant';

@Component({
  selector: 'air-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
})
export class BookingsTableComponent {
  selectAll = new FormControl(false);
  bookings = mockBookingsData;
  readonly columns = ['checkbox', 'number', 'flight', 'triptype', 'dates', 'passengers', 'price', 'actions'];

  constructor(private router: Router) {}

  remove(item: BookingModel): void {
    this.bookings = this.bookings.filter((booking) => booking !== item);
    // TODO: remove the bokking via service
  }

  edit(item: BookingModel): void {
    console.log(`Edit button flight=${item.flightNumber}`);
    this.router.navigateByUrl('/booking');
    // TODO: pre-fill data on booking page via a service
  }
}