import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state.model';
import { appFeatureKey } from '../reducers/app.reducer';
import { selectPassengersInfo, selectSelectedFlights } from './flight-data.selectors';
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

export const selectBookingFromPrevSteps = createSelector(
  selectSelectedFlights,
  selectPassengersInfo,
  (flights, passengers) => {
    if (!flights || !passengers) {
      return;
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
    const totalPrice: FlightPrice | null = flights.flight
      ? flights.returnFlight
        ? sumFlightPrices(flights.flight.price, flights.returnFlight.price)
        : flights.flight.price
      : null;
    return {
      isCompleted: false,
      flightType: flights.flight && flights.returnFlight ? 'roundtrip' : ('oneway' as FlightType),
      flight: flights.flight,
      returnFlight: flights.returnFlight,
      passengers: bookingPassengers,
      passengerData: passengers?.passengers as Array<Passenger>,
      price: totalPrice,
    };
  },
);

export const selectIdForDetails = createSelector(selectFeature, (state) => state.idForDetails);

export const selectBooking = createSelector(
  selectBookingFromPrevSteps,
  selectIdForDetails,
  selectBookings,
  (booking, id, bookings) => {
    return (id ? bookings.find((val) => val.id === id) : booking) as Booking;
  },
);
