import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../state.model';
import { appFeatureKey } from '../reducers/app.reducer';
import { selectPassengersInfo, selectSelectedFlights } from './flight-data.selectors';
// import { Flight } from '@shared/types/flight';
import { FlightType } from '@shared/types/flight-type';
import { Passenger, Passengers } from '@shared/types/passengers';
import { Booking } from '@shared/types/booking';
import { FlightPrice } from '@shared/types/flight-price';

export const selectFeature = createFeatureSelector<AppState>(appFeatureKey);

export const selectCurrentOrder = createSelector(selectFeature, (state) => state.currentOrder);

export const selectBookingFromPrevSteps = createSelector(
  selectSelectedFlights,
  selectPassengersInfo,
  (flights, passengers) => {
    return {
      isCompleted: false,
      flightType: flights.flight && flights.returnFlight ? 'roundtrip' : ('oneway' as FlightType),
      flight: flights.flight,
      returnFlight: flights.returnFlight,
      passengers: passengers?.passengers.reduce((acc, cur) => {
        if (cur.category in acc) {
          acc[cur.category] += 1;
        } else {
          acc[cur.category] = 1;
        }
        return acc
      }, {} as Passengers),
      passengerData: passengers?.passengers as Array<Passenger>,
      price: {} as FlightPrice,
    };
  },
);

export const selectIdForDetails = createSelector(selectFeature, (state) => state.idForDetails);

export const selectBooking = createSelector(
  selectBookingFromPrevSteps,
  selectIdForDetails,
  selectCurrentOrder,
  (booking, id, bookings) => {
    return (id ? bookings.filter((val) => val.id === id)[0] : booking) as Booking;
  },
);
