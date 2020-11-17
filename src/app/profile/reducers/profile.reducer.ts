import { createReducer, on } from '@ngrx/store';

export interface ProfileState {}

export const initialState: ProfileState = {};
export const emptyState: ProfileState = {};

const _profileReducer = createReducer(initialState);

export function profileReducer(state, action) {
  return _profileReducer(state, action);
}
