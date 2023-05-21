import { Airport } from '@booking/types/airport';
import { FlightType } from './flight-type';
import { Passengers } from './passengers';

export interface FlightSearchData {
  flightType: FlightType;
  departure: Airport;
  arrival: Airport;
  flightDate: string;
  returnDate?: string;
  passengers: Passengers;
}
