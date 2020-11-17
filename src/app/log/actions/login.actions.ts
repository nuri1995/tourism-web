import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const login = createAction('[LOGIN] Login', props<{ user: User }>());

export const loginSuccess = createAction(
  '[LOGIN] Login Success',
  props<{ user }>()
);

export const loginFailure = createAction(
  '[LOGIN] Login Failure',
  props<{ payload: any }>()
);
export const loginInvalid = createAction(
  '[LOGIN] Login Invalid',
  props<{ message: string }>()
);

export const logout = createAction('[LOGIN] Logout');
export const logoutSuccess = createAction('[LOGIN] Logout Success');
export const logoutFailure = createAction(
  '[LOGIN] Logout Failure',
  props<{ payload: any }>()
);

export const register = createAction('[LOGIN] Register', props<{ user }>());

export const registerSuccess = createAction(
  '[LOGIN] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[LOGIN] Register Failure',
  props<{ payload: any }>()
);

export const registerEmailValid = createAction(
  '[LOGIN] Register Email Valid',
  props<{ user: User }>()
);

export const registerInvalid = createAction(
  '[LOGIN] Register Invalid',
  props<{ message: string }>()
);
