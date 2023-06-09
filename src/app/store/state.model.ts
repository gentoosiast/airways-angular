import { User } from '@core/types/user';
import { FlightSearchData } from '@shared/types/flight-data';
import { Flights } from '@shared/types/flights';
import { PassengersInfo } from '@shared/types/passengers';
import { Booking } from '@shared/types/booking';
import { UserSettings } from '@shared/types/user-settings';

export interface AppState {
  flightSearchData: FlightSearchData | null;
  flights: Flights | null;
  selectedFlights: {
    flightIdx?: number;
    returnFlightIdx?: number;
  };
  passengersInfo: PassengersInfo | null;
  user: User | null;
  userSettings: UserSettings;
  bookings: Array<Booking>;
  currentBookingId: string | null;
}
