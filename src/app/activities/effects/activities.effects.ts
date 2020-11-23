import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
  updateActivity,
  updateActivityFailure,
  updateActivitySuccess,
} from '../actions/activities.actions';
import { Router } from '@angular/router';
import { ActivitiesService } from '../services/activities.service';

@Injectable()
export class ActivitiesEffects {
  constructor(
    private actions$: Actions,
    private activitiesService: ActivitiesService,
    private router: Router
  ) {}

  getActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivities),
      mergeMap(() =>
        this.activitiesService.getActivities().pipe(
          map((activities) => getActivitiesSuccess({ activities: activities })),
          catchError((err) => of(getActivitiesError({ payload: err })))
        )
      )
    )
  );

  getActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getActivity),
      mergeMap(({ activity }) =>
        this.activitiesService.getActivity(activity.id).pipe(
          map(() => updateActivitySuccess({ activity: activity })),
          catchError((err) => of(updateActivityFailure({ payload: err })))
        )
      )
    )
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActivity),
      mergeMap(({ activity }) =>
        this.activitiesService.updateActivities(activity).pipe(
          map(() => updateActivitySuccess({ activity: activity })),
          catchError((err) => of(updateActivityFailure({ payload: err })))
        )
      )
    )
  );

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteActivity),
      mergeMap(({ activity }) =>
        this.activitiesService.deleteActivity(activity).pipe(
          map(() => deleteActivitySuccess({ activity: activity })),
          catchError((err) => of(deleteActivityFailure({ payload: err })))
        )
      )
    )
  );
  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createActivity),
      mergeMap(({ activity }) =>
        this.activitiesService.addActivity(activity).pipe(
          map(() => createActivitySuccess({ activity: activity })),
          catchError((err) => of(createActivityFailure({ payload: err })))
        )
      )
    )
  );
}
