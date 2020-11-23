import { createAction, props } from '@ngrx/store';
import { Activity } from '../models/activity';

export const getActivities = createAction('[ACTIVITIES] Get activities');

export const getActivitiesSuccess = createAction(
  '[ACTIVITIES] Activities Success',
  props<{ activities: Activity[] }>()
);

export const getActivitiesError = createAction(
  '[ACTIVITIES] Get all error',
  props<{ payload: any }>()
);
export const getActivity = createAction(
  '[ACTIVITIES] Get activitiy',
  props<{ activity: Activity }>()
);

export const getActivitySuccess = createAction(
  '[ACTIVITIES] Get activity Success',
  props<{ activity: Activity }>()
);

export const getActivityError = createAction(
  '[ACTIVITIES] Get activity error',
  props<{ payload: any }>()
);

export const updateActivity = createAction(
  '[ACTIVITIES] Update Activity',
  props<{ activity: Activity }>()
);

export const updateActivitySuccess = createAction(
  '[ACTIVITIES] Update Activity Success',
  props<{ activity: Activity }>()
);

export const updateActivityFailure = createAction(
  '[ACTIVITIES] Update Activity Failure',
  props<{ payload: any }>()
);

export const deleteActivity = createAction(
  '[ACTIVITIES] Delete Activity',
  props<{ activity: Activity }>()
);

export const deleteActivitySuccess = createAction(
  '[ACTIVITIES] Delete Activity Success',
  props<{ activity: Activity }>()
);

export const deleteActivityFailure = createAction(
  '[ACTIVITIES] Delete Activity Failure',
  props<{ payload: any }>()
);
export const createActivity = createAction(
  '[ACTIVITIES] Create Activity',
  props<{ activity: Activity }>()
);

export const createActivitySuccess = createAction(
  '[ACTIVITIES] Create Activity Success',
  props<{ activity: Activity }>()
);

export const createActivityFailure = createAction(
  '[ACTIVITIES] Create Activity Failure',
  props<{ payload: any }>()
);
