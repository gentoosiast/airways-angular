import { Flight } from '@booking/types/flight';

export interface FlightsResponse {
  flights: Flight[];
  returnFlights?: Flight[];
}
