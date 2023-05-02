import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Booking } from '@shared/models/booking.model';

@Component({
  selector: 'air-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
})
export class BookingsTableComponent implements OnInit {
  @Input() isEditable = false;
  @Output() removeBooking = new EventEmitter<Booking>();
  @Output() editBooking = new EventEmitter<Booking>();
  @Output() bookingDetails = new EventEmitter<Booking>();

  @Input() bookings: Array<Booking & { isSelected?: boolean }> = [];
  areAllSelected = true;
  readonly columns = ['number', 'flight', 'triptype', 'dates', 'passengers', 'price', 'actions'];

  ngOnInit(): void {
    this.bookings = this.bookings.map((value) => {
      return { ...value, isSelected: true };
    });
  }

  remove(item: Booking): void {
    this.removeBooking.emit(item);
  }

  edit(item: Booking): void {
    this.editBooking.emit(item);
  }

  details(item: Booking): void {
    this.bookingDetails.emit(item);
  }

  isAllSelected(): boolean {
    this.areAllSelected = this.bookings.every((value) => value.isSelected);
    return this.areAllSelected;
  }

  selectAll(): void {
    this.bookings.forEach((value) => (value.isSelected = this.areAllSelected));
  }

  priceOfSelectedBookings(): number {
    return this.bookings.filter((value) => value.isSelected).reduce((acc, cur) => acc + cur.price, 0);
  }

  countOfSelectedBookings(): number {
    return this.bookings.filter((value) => value.isSelected).length;
  }

  endpointsSorter(a: Booking, b: Booking): number {
    return a.flightsData[0].departure.localeCompare(b.flightsData[0].departure);
  }

  tripTypeSorter(a: Booking, b: Booking): number {
    return a.flightType.localeCompare(b.flightType);
  }

  dateSorter(a: Booking, b: Booking): number {
    const aDate = a.flightsData[0].departureDate.date.toUtcNativeDate().getTime();
    const bDate = b.flightsData[0].departureDate.date.toUtcNativeDate().getTime();
    const aTimeMs = a.flightsData[0].departureDate.time.toAbsoluteMilliseconds();
    const bTimeMs = b.flightsData[0].departureDate.time.toAbsoluteMilliseconds();
    return aDate === bDate ? aTimeMs - bTimeMs : aDate - bDate;
  }
}
