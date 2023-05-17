import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state.model';
import * as UserActions from '../actions/user.actions';
import * as BookingsActions from '../actions/current-order.actions';

export const appFeatureKey = 'app';

const initalState: AppState = {
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

  on(BookingsActions.addBooking, (state, { booking }): AppState => {
    return {
      ...state,
      currentOrder: [...state.currentOrder.filter((item) => item.id !== booking.id), { ...booking, isSelected: true }],
    };
  }),

  on(
    BookingsActions.removeBooking,
    (state, { bookingId }): AppState => ({
      ...state,
      currentOrder: state.currentOrder.filter((item) => item.id !== bookingId),
    }),
  ),
);
