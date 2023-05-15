import { User } from '@core/types/user';
import { FlightSearchData } from '@shared/types/flight-data';

export interface AppState {
  flightSearchData: FlightSearchData | null;
  user: User | null;
}
