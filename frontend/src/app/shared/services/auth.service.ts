import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = 'http://localhost:5000/api/v1/';

  constructor(private http: HttpClient) {}

  me(): Observable<any> {
    const options = { withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}auth/me`, options);
  }

  loginUser(email, password): Observable<any> {
    const credentials = { email, password };
    const options = { withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}auth/login`,
      credentials,
      options
    );
  }

  registerUser(
    firstName: string,
    middleInitial: string,
    lastName: string,
    email: string,
    password: string,
    role: string,
    phoneNumber: string
  ): Observable<any> {
    const credentials = {
      firstName,
      middleInitial,
      lastName,
      email,
      password,
      role,
      phoneNumber,
    };
    const options = { withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}auth/register`,
      credentials,
      options
    );
  }

  logoutUser(): Observable<any> {
    const options = { withCredentials: true };
    return this.http.delete<any>(`${this.apiUrl}auth/logout`, options);
  }

  verifyEmail(email: string, token: string): Observable<any> {
    const credentials = { email, token };
    const options = { withCredentials: true };
    return this.http.post<any>(
      `${this.apiUrl}auth/verify`,
      credentials,
      options
    );
  }

  resetPassword(email): Observable<any> {
    const credentials = { email };
    return this.http.post<any>(
      `${this.apiUrl}auth/forgot-password`,
      credentials
    );
  }
}
