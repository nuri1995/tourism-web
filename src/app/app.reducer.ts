import { ActionReducerMap } from '@ngrx/store';
import * as loginReducers from './log/reducers';
import * as activitiesReducers from './activities/reducers';

/*
export interface AppState {
  todos: Todo[];
}
*/
export interface AppState {
  loginApp: loginReducers.LoginState;
  activitiesApp: activitiesReducers.ActivitiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  loginApp: loginReducers.loginReducer,
  activitiesApp: activitiesReducers.activitiesReducer,
};
