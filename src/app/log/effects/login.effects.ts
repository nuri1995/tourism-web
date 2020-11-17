import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user.service';
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
} from '../actions/login.actions';
import { Router } from '@angular/router';
import { updateUser, UpdateUserFailure, updateUserSuccess } from '../actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ user }) =>
        this.userService.login(user.email, user.password).pipe(
          map(
            (user) => {
              if (user) {
                this.router.navigate(['/']);
                return loginSuccess({ user: user });
              } else {
                return loginInvalid({
                  message: 'Username or password is incorrect',
                });
              }
            },
            catchError((err) => of(loginFailure({ payload: err })))
          )
        )
      )
    )
  );

  loginLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(
        () => {
          this.userService.logout();
          this.router.navigate(['/login']);
          return logoutSuccess();
        },
        catchError((err) => of(logoutFailure({ payload: err })))
      )
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ user }) =>
        this.userService.checkEmail(user.email).pipe(
          map(
            (userMatch) => {
              if (!userMatch) {
                console.log(user);
                return registerEmailValid({ user: user });
              } else {
                return registerInvalid({
                  message: 'Email is already taken',
                });
              }
            },
            catchError((err) => of(registerFailure({ payload: err })))
          )
        )
      )
    )
  );
  registerEmailValid$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerEmailValid),
      mergeMap(({ user }) =>
        this.userService.registerUser(user).pipe(
          map(
            (user) => {
              this.router.navigate(['/login']);
              return registerSuccess({ user: user });
            },
            catchError((err) => of(registerFailure({ payload: err })))
          )
        )
      )
    )
  );
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(
            () => {
              console.log(user);
              return updateUserSuccess({ user: user });
            },
            catchError((err) => of(UpdateUserFailure({ payload: err })))
          )
        )
      )
    )
  );
}
