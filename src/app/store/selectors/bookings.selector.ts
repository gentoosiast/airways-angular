import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state.model';
import { appFeatureKey } from '../reducers/app.reducer';
import {
  selectFlightSearchData,
  selectFlights,
  selectPassengersInfo,
  selectSelectedFlights,
} from './flight-data.selectors';
import { FlightType } from '@shared/types/flight-type';
import { Passenger, Passengers } from '@shared/types/passengers';
import { Booking } from '@shared/types/booking';
import { FlightPrice } from '@shared/types/flight-price';
import { sumFlightPrices } from '../utils/sum-prices';

export const selectFeature = createFeatureSelector<AppState>(appFeatureKey);

export const selectCurrentBookings = createSelector(selectFeature, (state) =>
  state.bookings.filter((booking) => !booking.isCompleted),
);

export const selectCompletedBookings = createSelector(selectFeature, (state) =>
  state.bookings.filter((booking) => booking.isCompleted),
);

export const selectBookings = createSelector(selectFeature, (state) => state.bookings);

export const selectCurrentBookingId = createSelector(selectFeature, (state) => state.currentBookingId);

export const selectBookingFromPrevSteps = createSelector(
  selectSelectedFlights,
  selectPassengersInfo,
  selectFlightSearchData,
  selectFlights,
  selectCurrentBookingId,
  (selectedFlights, passengers, flightSearchData, flights, id) => {
    if (!selectedFlights.flightIdx || !passengers || !flightSearchData || !flights) {
      return null;
    }
    const bookingPassengers: Passengers = passengers.passengers.reduce(
      (acc, cur) => {
        if (cur.category in acc) {
          acc[cur.category] += 1;
        } else {
          acc[cur.category] = 1;
        }
        return acc;
      },
      { adults: 0, children: 0, infants: 0 },
    );
    const flight = flights.flights[selectedFlights.flightIdx];
    const returnFlight =
      selectedFlights && selectedFlights.returnFlightIdx && flights.returnFlights
        ? flights.returnFlights[selectedFlights.returnFlightIdx]
        : undefined;
    const totalPrice: FlightPrice = returnFlight ? sumFlightPrices(flight.price, returnFlight.price) : flight.price;
    return {
      id: id,
      isCompleted: false,
      flightType: selectedFlights.flightIdx && selectedFlights.returnFlightIdx ? 'roundtrip' : ('oneway' as FlightType),
      flightSearchData: flightSearchData,
      flights: flights,
      flight: flight,
      flightIdx: selectedFlights.flightIdx,
      returnFlight: returnFlight,
      returnFlightIdx: selectedFlights.returnFlightIdx,
      passengers: bookingPassengers,
      passengerData: passengers?.passengers as Array<Passenger>,
      passengersContacts: passengers.contacts,
      price: totalPrice,
    } as Booking;
  },
);
