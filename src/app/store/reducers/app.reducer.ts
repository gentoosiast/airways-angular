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
  selectedFlights: {},
  passengersInfo: null,
  user: null,
  userSettings: { dateFormat: DateFormat.DD_MM_YYYY, currency: Currency.Euro },
  bookings: [],
  currentBookingId: null,
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

  on(FlightDataActions.saveSelectedFlights, (state, { flightIdx, returnFlightIdx }): AppState => {
    if (flightIdx) {
      return {
        ...state,
        selectedFlights: { ...state.selectedFlights, flightIdx },
      };
    }
    if (returnFlightIdx) {
      return {
        ...state,
        selectedFlights: { ...state.selectedFlights, returnFlightIdx },
      };
    }
    return state;
  }),

  on(BookingsActions.addBooking, (state, { booking }): AppState => {
    return {
      ...state,
      bookings: [...state.bookings.filter((item) => item.id !== booking.id), booking],
    };
  }),

  on(
    BookingsActions.removeBooking,
    (state, { id }): AppState => ({
      ...state,
      bookings: state.bookings.filter((item) => item.id !== id),
    }),
  ),

  on(BookingsActions.checkoutBooking, (state, { id }): AppState => {
    const booking = state.bookings.find((booking) => booking.id === id);
    if (!booking) {
      return state;
    }
    return {
      ...state,
      bookings: [...state.bookings.filter((item) => item.id !== id), { ...booking, isCompleted: true }],
    };
  }),

  on(
    BookingsActions.storeCurrentBookingId,
    (state, { id }): AppState => ({
      ...state,
      currentBookingId: id,
    }),
  ),

  on(
    BookingsActions.prefillBookingData,
    (state, { booking }): AppState => ({
      ...state,
      flightSearchData: booking.flightSearchData,
      flights: booking.flights,
      selectedFlights: {
        flightIdx: booking.flightIdx,
        returnFlightIdx: booking.returnFlightIdx,
      },
      passengersInfo: {
        passengers: booking.passengerData,
        contacts: booking.passengersContacts,
      },
      currentBookingId: booking.id || null,
    }),
  ),

  on(
    BookingsActions.clearBookingData,
    (state): AppState => ({
      ...state,
      flights: null,
      selectedFlights: {},
      currentBookingId: null,
    }),
  ),
);
