import { createReducer, on } from '@ngrx/store';
import {
  getActivities,
  getActivitiesError,
  getActivitiesSuccess,
  updateActivity,
  updateActivityFailure,
  updateActivitySuccess,
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
  })),
  on(updateActivity, (state) => ({ ...state, loading: true })),
  on(updateActivitySuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [
      ...state.activities.map((_activity) => {
        if (_activity.id === activity.id) {
          return (_activity = activity);
        } else {
          return _activity;
        }
      }),
    ],
  })),

  on(updateActivityFailure, (state, { payload }) => ({
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
