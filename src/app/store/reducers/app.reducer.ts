import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state.model';
import * as UserActions from '../actions/user.actions';
import * as FlightDataActions from '../actions/flight-data.actions';

export const appFeatureKey = 'app';

const initalState: AppState = {
  flightSearchData: null,
  flights: null,
  passengersInfo: null,
  user: null,
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
);
