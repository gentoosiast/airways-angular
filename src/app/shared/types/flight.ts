import { Airport } from '@booking/types/airport';
import { FlightPrice } from '@shared/types/flight-price';

export interface Flight {
  flightNumber: string; // i.e. 'FR 1925'
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureDate: string;
  arrivalDate: string;
  flightDuration: number; // minutes
  price: FlightPrice;
  seats: number;
  availableSeats: number;
  connections: string[]; // list of IATA codes
}
