import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = 'http://localhost:5000/api/v1/';
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    const options = { withCredentials: true };
    return this.http.get<any>(`${this.apiUrl}users`, options);
  }
}
