import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const updateUser = createAction(
  '[USER] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[USER] Update User Success',
  props<{ user: User }>()
);

export const UpdateUserFailure = createAction(
  '[USER] Update User Failure',
  props<{ payload: any }>()
);
