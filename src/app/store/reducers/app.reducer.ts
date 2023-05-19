import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state.model';
import * as UserActions from '../actions/user.actions';
import * as FlightDataActions from '../actions/flight-data.actions';
import * as BookingsActions from '../actions/current-order.actions';

export const appFeatureKey = 'app';

const initalState: AppState = {
  flightSearchData: null,
  flights: null,
  passengersInfo: null,
  user: null,
  currentOrder: [],
};

export const appReducer = createReducer(
  initalState,
  on(
    UserActions.saveUser,
    UserActions.loadUserSuccess,
    (state, { user }): AppState => ({
      ...state,
      user,
    }),
  ),

  on(
    UserActions.logoutUser,
    UserActions.loadUserFail,
    (state): AppState => ({
      ...state,
      user: null,
    }),
  ),

  on(
    FlightDataActions.saveFlightSearch,
    (state, { flightSearchData }): AppState => ({
      ...state,
      flightSearchData,
    }),
  ),

  on(
    FlightDataActions.saveFlights,
    (state, { flights }): AppState => ({
      ...state,
      flights,
    }),
  ),

  on(
    FlightDataActions.savePassengersInfo,
    (state, { passengersInfo }): AppState => ({
      ...state,
      passengersInfo,
    }),
  ),

  on(BookingsActions.addBooking, (state, { booking }): AppState => {
    return {
      ...state,
      currentOrder: [...state.currentOrder.filter((item) => item.id !== booking.id), { ...booking, isSelected: true }],
    };
  }),

  on(
    BookingsActions.removeBooking,
    (state, { id }): AppState => ({
      ...state,
      currentOrder: state.currentOrder.filter((item) => item.id !== id),
    }),
  ),
);
