import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  private activityUrl = 'api/activities'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.activityUrl).pipe(
      tap((activities: Activity[]) => console.log(activities)),
      catchError(this.handleError<Activity[]>('getActivities', []))
    );
  }

  getActivity(id: number): Observable<Activity> {
    const url = `${this.activityUrl}/${id}`;
    return this.http.get<Activity>(url).pipe(
      tap((_) => console.log(`fetched activity id=${id}`)),
      catchError(this.handleError<Activity>(`getActivity id=${id}`))
    );
  }
  addActivity(activity: Activity): Observable<Activity> {
    return this.http
      .post<Activity>(this.activityUrl, activity as Activity, this.httpOptions)
      .pipe(
        tap((newActivity: Activity) => console.log(newActivity as Activity)),
        catchError(this.handleError<Activity>('registerUser'))
      );
  }

  updateActivities(activity: Activity): Observable<any> {
    return this.http
      .put(this.activityUrl, activity as Activity, this.httpOptions)
      .pipe(
        tap((_) => console.log(activity)),
        catchError(this.handleError<any>('updateActivity'))
      );
  }
  deleteActivity(activity: Activity | number): Observable<Activity> {
    const id = typeof activity === 'number' ? activity : activity.id;
    const url = `${this.activityUrl}/${id}`;

    return this.http.delete<Activity>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted activity id=${id}`)),
      catchError(this.handleError<Activity>('deleteHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
