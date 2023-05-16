import { User } from '@core/types/user';
import { FlightSearchData } from '@shared/types/flight-data';
import { Flights } from '@shared/types/flights';

export interface AppState {
  flightSearchData: FlightSearchData | null;
  flights: Flights | null;
  user: User | null;
}
