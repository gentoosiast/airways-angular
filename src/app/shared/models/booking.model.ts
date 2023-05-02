import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export interface FlightsData {
  departure: string;
  arrival: string;
  departureDate: { date: TuiDay; time: TuiTime };
  arrivalDate: { date: TuiDay; time: TuiTime };
}

export interface Passengers {
  adults: number;
  children?: number;
  infants?: number;
}

export interface Booking {
  flightNumber: string;
  flightType: 'oneway' | 'roundtrip';
  flightsData: Array<FlightsData>;
  passengers: Passengers;
  price: number;
}
