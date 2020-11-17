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
