import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContractorGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.me().pipe(
      map((response) => {
        const role = response.data.user.role;

        if (role === 'CONTRACTOR') {
          return true;
        }

        if (role === 'FREELANCER') {
          this.router.navigate(['/', 'freelancer']);
        }

        return false;
      }),
      catchError((error) => {
        this.router.navigate(['/', 'login']);

        return of(false);
      })
    );
  }
}
