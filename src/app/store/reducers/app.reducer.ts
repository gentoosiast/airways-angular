import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state.model';
import * as UserActions from '../actions/user.actions';
import * as UserSettingsActions from '../actions/user-settings.actions';
import * as FlightDataActions from '../actions/flight-data.actions';
import * as BookingsActions from '../actions/current-order.actions';
import { Currency, DateFormat } from '@core/types/user-settings';

export const appFeatureKey = 'app';

const initalState: AppState = {
  flightSearchData: null,
  flights: null,
  passengersInfo: null,
  user: null,
  userSettings: { dateFormat: DateFormat.DD_MM_YYYY, currency: Currency.Euro },
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
    UserSettingsActions.saveUserSettings,
    UserSettingsActions.loadUserSettingsSuccess,
    (state, { userSettings }): AppState => ({
      ...state,
      userSettings,
    }),
  ),

  on(
    UserSettingsActions.loadUserSettingsFail,
    (state): AppState => ({
      ...state,
      userSettings: initalState.userSettings,
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
