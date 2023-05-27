import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency, DateFormat } from '@core/types/user-settings';
import { Booking } from '@shared/types/booking';

@Component({
  selector: 'air-bookings-table',
  templateUrl: './bookings-table.component.html',
  styleUrls: ['./bookings-table.component.scss'],
})
export class BookingsTableComponent implements OnInit {
  @Input() bookings: Array<Booking> | null = [];
  @Input() caption = '';
  @Input() dateFormat: DateFormat = DateFormat.DD_MM_YYYY;
  @Input() isEditable = false;
  @Input() preferredCurrency: Currency = Currency.Euro;
  @Output() bookingDetails = new EventEmitter<Booking>();
  @Output() editBooking = new EventEmitter<Booking>();
  @Output() removeBooking = new EventEmitter<Booking>();
  @Output() checkout = new EventEmitter<string>();

  selectedBookings = new Map<string, boolean>();
  areAllSelected = true;
  readonly columns = ['number', 'flight', 'triptype', 'dates', 'passengers', 'price', 'actions'];

  ngOnInit(): void {
    this.bookings?.forEach((booking) => {
      if (booking.id) {
        this.selectedBookings.set(booking.id, true);
      }
    });
  }

  getFormatForDatePipe(dateFormat: DateFormat): string {
    switch (dateFormat) {
      case DateFormat.MM_DD_YYYY:
        return 'LLL d, yyyy, H:mm';
      case DateFormat.DD_MM_YYYY:
        return 'd LLL, yyyy, H:mm';
      case DateFormat.YYYY_MM_DD:
        return 'yyyy, LLL d, H:mm';
      default:
        return 'd LLL, yyyy, H:mm';
    }
  }

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
    let areAllSelected = true;
    this.selectedBookings.forEach((value) => {
      areAllSelected = areAllSelected && value;
    });
    this.areAllSelected = areAllSelected;
    return this.areAllSelected;
  }

  selectAll(): void {
    this.selectedBookings.forEach((_value, key) => this.selectedBookings.set(key, this.areAllSelected));
  }

  countOfSelectedBookings(): number {
    let cnt = 0;
    this.selectedBookings.forEach((value) => (cnt += value ? 1 : 0));
    return cnt;
  }

  priceOfSelectedBookings(): number {
    return (
      this.bookings
        ?.filter((value) => value.id && this.selectedBookings.get(value.id))
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

  onContinue() {
    this.selectedBookings.forEach((value, key) => {
      if (value) {
        this.checkout.emit(key);
      }
    });
  }
}
