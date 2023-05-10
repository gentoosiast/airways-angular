import { Flight } from '@booking/types/flight';

export interface FlightsResponse {
  departure: Flight[];
  arrival?: Flight[];
}
