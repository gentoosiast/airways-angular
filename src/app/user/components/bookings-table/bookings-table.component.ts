import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Currency } from '@core/types/user-settings';
import { Booking } from '@shared/types/booking';

@Component({
  selector: 'air-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
})
export class BookingsTableComponent {
  @Input() bookings: Array<Booking & { isSelected?: boolean }> | null = [];
  @Input() caption = '';
  @Input() isEditable = false;
  @Input() preferredCurrency: Currency = Currency.Euro;
  @Output() bookingDetails = new EventEmitter<Booking>();
  @Output() editBooking = new EventEmitter<Booking>();
  @Output() removeBooking = new EventEmitter<Booking>();

  areAllSelected = true;
  readonly columns = ['number', 'flight', 'triptype', 'dates', 'passengers', 'price', 'actions'];

  edit(item: Booking): void {
    this.editBooking.emit(item);
  }

  remove(item: Booking): void {
    this.removeBooking.emit(item);
  }

  showDetails(item: Booking): void {
    this.bookingDetails.emit(item);
  }

  isAllSelected(): boolean {
    this.areAllSelected = !!this.bookings?.every((value) => value.isSelected);
    return this.areAllSelected;
  }

  selectAll(): void {
    this.bookings?.forEach((value) => (value.isSelected = this.areAllSelected));
  }

  countOfSelectedBookings(): number {
    return this.bookings?.filter((value) => value.isSelected).length || 0;
  }

  priceOfSelectedBookings(): number {
    return (
      this.bookings
        ?.filter((value) => value.isSelected)
        .reduce((acc, cur) => acc + cur.price.total[this.preferredCurrency], 0) || 0
    );
  }

  dateSorter(a: Booking, b: Booking): number {
    return new Date(a.flight.departureDate).getTime() - new Date(b.flight.departureDate).getTime();
  }

  endpointsSorter(a: Booking, b: Booking): number {
    return a.flight.departureAirport.name.localeCompare(b.flight.departureAirport.name);
  }

  tripTypeSorter(a: Booking, b: Booking): number {
    return a.flightType.localeCompare(b.flightType);
  }
}
