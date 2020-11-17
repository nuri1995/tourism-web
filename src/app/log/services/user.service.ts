import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private userUrl = 'api/registerUsers'; // URL to web api
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap((users: User[]) => console.log(users)),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.userUrl, user as User, this.httpOptions)
      .pipe(
        tap((newUser: User) => console.log(newUser as User)),
        catchError(this.handleError<User>('registerUser'))
      );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.get<User[]>(this.userUrl).pipe(
      map((users) => {
        const user = users.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          return user;
        } else {
          throwError('Invalid username or password');
        }
      }),
      tap((u) => {
        const outcome = u ? `fetched` : `did not find`;
        console.log(`${outcome} user email=${email} user password=${password}`);
        if (u) {
          localStorage.setItem('currentUser', JSON.stringify(u));
          this.currentUserSubject.next(u);
        }
      }),
      catchError(this.handleError<User>(`getUser email=${email}`))
    );
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  checkEmail(email: string): Observable<User> {
    return this.http.get<User[]>(this.userUrl).pipe(
      map((users) => users.find((user) => user.email === email)),
      tap((u) => {
        const outcome = u ? `fetched` : `did not find`;
        console.log(`${outcome} user email=${email}`);
      }),
      catchError(this.handleError<User>(`getUser email=${email}`))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.userUrl, user as User, this.httpOptions).pipe(
      tap((_) => {
        console.log(`updated user id=${user.id}`);
      }),
      catchError(this.handleError<any>('updateUser'))
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
