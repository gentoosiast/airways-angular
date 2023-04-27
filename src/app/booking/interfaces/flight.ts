export interface Flight {
  flightNumber: string; // i.e. 'FR 1925'
  departureAirport: string; // IATA code
  arrivalAirport: string; // IATA code
  departureDate: string;
  arrivalDate: string;
  flightDuration: number; // minutes
  price: number; // in Euros
  seats: number;
  availableSeats: number;
  connections: string[]; // list of IATA codes
}
