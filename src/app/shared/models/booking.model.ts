import { TuiDay, TuiTime } from '@taiga-ui/cdk';

export interface Passenger {
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  birthDate: TuiDay;
  baggageCount: number;
  isAssistanceNeeded: boolean;
  seat?: string;
  tariff: 'adults' | 'children' | 'infants';
}

export interface Passengers {
  adults: number;
  children?: number;
  infants?: number;
}

export interface FlightsData {
  departure: string;
  arrival: string;
  departureDate: { date: TuiDay; time: TuiTime };
  arrivalDate: { date: TuiDay; time: TuiTime };
}

export interface Booking {
  flightNumber: string;
  flightType: 'oneway' | 'roundtrip';
  flightsData: Array<FlightsData>;
  passengers: Passengers;
  passengerData: Array<Passenger>;
  price: number;
}
