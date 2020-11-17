import { createReducer, on } from '@ngrx/store';

import {
  loginSuccess,
  login,
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
  updateUser,
  UpdateUserFailure,
  updateUserSuccess,
} from '../actions';
import { User } from '../models/user';

export interface LoginState {
  login: User;
  loading: boolean;
  loaded: boolean;
  error: any;
  message: string;
}

export const initialState: LoginState = {
  login: JSON.parse(localStorage.getItem('currentUser')),
  loading: false,
  loaded: false,
  error: null,
  message: '',
};
export const emptyState: LoginState = {
  login: null,
  loading: false,
  loaded: false,
  error: null,
  message: '',
};

const _loginReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, message: '' })),

  on(loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    login: user,
  })),

  on(loginFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(loginInvalid, (state, { message }) => ({
    ...state,
    loading: false,
    loaded: false,
    message: message,
  })),
  on(logout, (state) => ({ ...state, loading: true, message: '' })),
  on(logoutSuccess, (state) => ({
    ...emptyState,
  })),
  on(logoutFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(register, (state) => ({ ...state, loading: true, message: '' })),

  on(registerEmailValid, (state) => ({ ...state, loading: true, message: '' })),

  on(registerSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    login: user,
  })),

  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: {
      url: payload.url,
      status: payload.status,
      message: payload.message,
    },
  })),
  on(registerInvalid, (state, { message }) => ({
    ...state,
    loading: false,
    loaded: false,
    message: message,
  })),
  on(updateUser, (state) => ({ ...state, loading: true, message: '' })),

  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    login: user,
  })),

  on(UpdateUserFailure, (state, { payload }) => ({
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

export function loginReducer(state, action) {
  return _loginReducer(state, action);
}
