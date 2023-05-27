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

  on(FlightDataActions.saveSelectedFlights, (state, { flight, returnFlight }): AppState => {
    if (flight) {
      return {
        ...state,
        selectedFlights: { ...state.selectedFlights, flight },
      };
    }
    if (returnFlight) {
      return {
        ...state,
        selectedFlights: { ...state.selectedFlights, returnFlight },
      };
    }
    return state;
  }),

  on(BookingsActions.addBooking, (state, { booking }): AppState => {
    return {
      ...state,
      bookings: [...state.bookings.filter((item) => item.id !== booking.id), { ...booking, isSelected: true }],
    };
  }),

  on(
    BookingsActions.removeBooking,
    (state, { id }): AppState => ({
      ...state,
      bookings: state.bookings.filter((item) => item.id !== id),
    }),
  ),

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
        flight: booking.flight,
        returnFlight: booking.returnFlight,
      },
      passengersInfo: {
        passengers: booking.passengerData,
        contacts: booking.passengersContacts,
      },
      currentBookingId: booking.id || null,
    }),
  ),
);
