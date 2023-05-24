import { Passengers, Passenger } from './passengers';
import { FlightPrice } from './flight-price';
import { Flight } from './flight';
import { FlightType } from './flight-type';

export interface Booking {
  id?: string;
  isCompleted: boolean;
  flightType: FlightType;
  flight: Flight;
  returnFlight?: Flight;
  passengers: Passengers;
  passengerData: Array<Passenger>;
  price: FlightPrice;
}
