import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { FlightType } from './flight-type';
import { Passengers, Passenger } from './passengers';

export interface FlightsData {
  departure: string;
  arrival: string;
  departureDate: { date: TuiDay; time: TuiTime };
  arrivalDate: { date: TuiDay; time: TuiTime };
}

export interface Booking {
  id?: string;
  flightNumber: string;
  flightType: FlightType;
  flightsData: Array<FlightsData>;
  passengers: Passengers;
  passengerData: Array<Passenger>;
  price: number;
}
