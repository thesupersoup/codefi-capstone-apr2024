import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  isSuccess: Boolean = false;
  isError: Boolean = false;

  // CREATE LOGIN FORM
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    role: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]), // make sure it is a valid email address
    password: new FormControl('', [Validators.required]),
  });

  private authSubscription = new Subscription();

  constructor(private authService: AuthService) {}
  // On Submit Function
  onSubmit() {
    this.isError = false;
    this.isSuccess = false;

    if (this.registerForm.invalid) return;

    this.authSubscription.add(
      this.authService
        .registerUser(
          this.registerForm.value.firstName,
          this.registerForm.value.lastName,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.role,
          this.registerForm.value.phoneNumber
        )
        .subscribe(
          (response) => {
            this.isSuccess = true;
            console.log(response);
          },
          (error) => {
            this.isError = true;
            console.error('Error:', error); // Handle error
          }
        )
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
