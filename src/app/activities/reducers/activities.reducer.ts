import { createReducer, on } from '@ngrx/store';
import {
  createActivity,
  createActivityFailure,
  createActivitySuccess,
  deleteActivity,
  deleteActivityFailure,
  deleteActivitySuccess,
  getActivities,
  getActivitiesError,
  getActivitiesSuccess,
  getActivity,
  getActivitySuccess,
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
  on(getActivity, (state) => ({ ...state, loading: true })),

  on(getActivitySuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    loaded: true,
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
  })),
  on(deleteActivity, (state) => ({ ...state, loading: true })),
  on(deleteActivitySuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [
      ...state.activities.filter((_activity) => _activity.id !== activity.id),
    ],
  })),
  on(deleteActivityFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(createActivity, (state) => ({ ...state, loading: true })),

  on(createActivitySuccess, (state, { activity }) => ({
    ...state,
    loading: false,
    loaded: true,
    activities: [...state.activities, activity],
  })),

  on(createActivityFailure, (state, { payload }) => ({
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
