import { User } from '@core/types/user';
import { FlightSearchData } from '@shared/types/flight-data';
import { Flights } from '@shared/types/flights';
import { PassengersInfo } from '@shared/types/passengers';
import { Booking } from '@shared/types/booking';
import { UserSettings } from '@shared/types/user-settings';

export interface AppState {
  flightSearchData: FlightSearchData | null;
  flights: Flights | null;
  passengersInfo: PassengersInfo | null;
  user: User | null;
  userSettings: UserSettings;
  currentOrder: Array<Booking & { isSelected: boolean }>;
}
