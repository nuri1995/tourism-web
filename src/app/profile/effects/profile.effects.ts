import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { mergeMap, map, catchError, tap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  loginInvalid,
  register,
  registerSuccess,
  registerFailure,
  registerEmailValid,
  registerInvalid,
} from '../actions/profile.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions$: Actions,
    // private userService: UserService,
    private router: Router
  ) {}
}
