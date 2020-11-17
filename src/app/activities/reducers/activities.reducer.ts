import { createReducer, on } from '@ngrx/store';
import {
  getActivities,
  getActivitiesError,
  getActivitiesSuccess,
} from '../actions';
import { Activity } from '../models/activity';

export interface ActivitiesState {
  activities: Activity[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  loaded: false,
  error: null,
};

const _activitiesReducer = createReducer(
  initialState,
  on(getActivities, (state) => ({ ...state, loading: true })),

  on(getActivitiesSuccess, (state, { activities }) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...activities],
  })),

  on(getActivitiesError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  }))
);

export function activitiesReducer(state, action) {
  return _activitiesReducer(state, action);
}
