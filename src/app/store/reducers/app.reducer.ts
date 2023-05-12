import { createReducer, on } from '@ngrx/store';
import { AppState } from '../state.model';
import * as UserActions from '../actions/user.actions';

export const appFeatureKey = 'app';

const initalState: AppState = {
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
);
