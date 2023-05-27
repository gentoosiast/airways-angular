import { Passengers, Passenger, PassengerContacts } from './passengers';
import { FlightPrice } from './flight-price';
import { Flight } from './flight';
import { FlightType } from './flight-type';
import { FlightSearchData } from './flight-data';
import { Flights } from './flights';

export interface Booking {
  id?: string;
  isCompleted: boolean;
  flightType: FlightType;
  flightSearchData: FlightSearchData;
  flights: Flights;
  flight: Flight;
  returnFlight?: Flight;
  passengers: Passengers;
  passengerData: Array<Passenger>;
  passengersContacts: PassengerContacts;
  price: FlightPrice;
}
