import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  getActivities,
  getActivitiesError,
  getActivitiesSuccess,
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
}
