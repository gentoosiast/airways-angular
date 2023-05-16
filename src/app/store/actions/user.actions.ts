import { createAction, props } from '@ngrx/store';
import { User } from '@core/types/user';

export const logoutUser = createAction('[User] Logout user');
export const loadUser = createAction('[User] Load user');
export const saveUser = createAction('[User] Save user', props<{ user: User }>());
export const loadUserSuccess = createAction('[User] Load user SUCCESS', props<{ user: User }>());
export const loadUserFail = createAction('[User] Load user FAIL');
