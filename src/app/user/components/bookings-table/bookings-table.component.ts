import { Component, Input } from '@angular/core';
// import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingModel } from '@shared/models/booking-data.model';
import { mockBookingsData } from '@user/constants/shopping-cart.constant';

@Component({
  selector: 'air-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
})
export class BookingsTableComponent {
  @Input() title = '';
  allSelected = true;
  bookings: Array<BookingModel & { state?: boolean }> = mockBookingsData.map((value) => {
    const newValue = { ...value, state: true };
    return newValue;
  });
  readonly columns = ['number', 'flight', 'triptype', 'dates', 'passengers', 'price', 'actions'];

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

  details(item: BookingModel): void {
    console.log(`Details button flight=${item.flightNumber}`);
    this.router.navigateByUrl('/booking/step-summary');
    // TODO: pre-fill data on booking summary page via a service
  }

  isAllSelected() {
    this.allSelected = this.bookings.every((value) => value.state);
    return this.allSelected;
  }

  selectAll(event: Event) {
    if (!event || !event.target) return;
    this.bookings.forEach((value) => (value.state = this.allSelected));
  }

  priceOfSelectedBookings() {
    return this.bookings.filter((value) => value.state).reduce((acc, cur) => acc + cur.price, 0);
  }

  countOfSelectedBookings() {
    return this.bookings.filter((value) => value.state).length;
  }

  flightNumberSorter(a: BookingModel, b: BookingModel): number {
    if (a.flightNumber > b.flightNumber) {
      return 1;
    }
    if (a.flightNumber < b.flightNumber) {
      return -1;
    }
    return 0;
  }

  endpointsSorter(a: BookingModel, b: BookingModel): number {
    if (a.fligthsData[0].departure > b.fligthsData[0].departure) {
      return 1;
    }
    if (b.fligthsData[0].departure > a.fligthsData[0].departure) {
      return -1;
    }
    return 0;
  }

  tripTypeSorter(a: BookingModel, b: BookingModel): number {
    if (a.flightType > b.flightType) {
      return 1;
    }
    if (a.flightType < b.flightType) {
      return -1;
    }
    return 0;
  }

  dateSorter(a: BookingModel, b: BookingModel): number {
    if (a.fligthsData[0].departureDate.date.toString('YMD') > b.fligthsData[0].departureDate.date.toString('YMD')) {
      return 1;
    }
    if (a.fligthsData[0].departureDate.date.toString('YMD') < b.fligthsData[0].departureDate.date.toString('YMD')) {
      return -1;
    }
    return (
      a.fligthsData[0].departureDate.time.toAbsoluteMilliseconds() -
      b.fligthsData[0].departureDate.time.toAbsoluteMilliseconds()
    );
  }
}
