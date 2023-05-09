import { Flight } from '@booking/interfaces/flight';

export interface FlightsResponse {
  departure: Flight[];
  arrival?: Flight[];
}
