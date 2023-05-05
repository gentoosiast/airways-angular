import { User } from '@core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const loginUser = createAction('[User] Login user', props<{ user: User }>());
export const logoutUser = createAction('[User] Logout user');
