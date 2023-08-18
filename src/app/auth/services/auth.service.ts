import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { signUp, login } from 'src/app/data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isuserLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private _http: HttpClient, private _router: Router) {}

  signup(data: signUp): Observable<any> {
    if (!data.userName || !data.emailAddress || !data.password) {
      alert('Please fill all the required fields');
      return of(null);
    }
    try {
      return this._http
        .post<any>('  http://localhost:3000/users', data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .pipe(
          tap((response: any) => {
            localStorage.setItem('user', JSON.stringify(response.token));
            alert('User sign-up successfully');
            this.isuserLoggedIn.next(true);
            this._router.navigate(['/hotels']);
          })
        );
    } catch (error) {
      console.log('Signup failed', error);
      alert('An error occurred during Signup. Please try again.');
      return of(null);
    }
  }

  login(data: login): Observable<any> {
    if (!data.emailAddress || !data.password) {
      alert('Please fill all the required fields');
      return of(null);
    }
    return this._http.get<any>('http://localhost:3000/users').pipe(
      tap((users: any) => {
        const user = users.find(
          (u: any) =>
            u.emailAddress === data.emailAddress && u.password === data.password
        );
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          alert('User logged in successfully');
          this.isuserLoggedIn.next(true);
          this.isLogginFailed.next(false);
          this._router.navigate(['./hotels']);
        } else {
          this.isuserLoggedIn.next(false);
          alert('Invalid credentials');
        }
      }),
      catchError((error: any) => {
        console.log('API error:', error);
        alert('An error occurred during login. Please try again.');
        return of(null);
      })
    );
  }

  reloadSeller() {
    if (localStorage.getItem('user')) {
      this.isuserLoggedIn.next(true);
      this._router.navigate(['./admin']);
    }
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
}