import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // CREATE LOGIN FORM
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]), // make sure it is a valid email address
    password: new FormControl('', [Validators.required]),
  });

  private authSubscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  // On Submit Function
  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authSubscription.add(
      this.authService
        .loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.error('Error:', error); // Handle error
          }
        )
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
