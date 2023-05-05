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
    UserActions.loginUser,
    (state, { user }): AppState => ({
      ...state,
      user,
    }),
  ),

  on(
    UserActions.logoutUser,
    (state): AppState => ({
      ...state,
      user: null,
    }),
  ),
);
