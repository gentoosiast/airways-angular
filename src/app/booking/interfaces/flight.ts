import { Airport } from '@core/interfaces/airport';

export interface Flight {
  flightNumber: string; // i.e. 'FR 1925'
  departureAirport: Airport;
  arrivalAirport: Airport;
  departureDate: string;
  arrivalDate: string;
  flightDuration: number; // minutes
  price: number; // in Euros
  seats: number;
  availableSeats: number;
  connections: string[]; // list of IATA codes
}
