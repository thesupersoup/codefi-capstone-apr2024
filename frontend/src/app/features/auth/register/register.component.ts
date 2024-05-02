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
  // CREATE LOGIN FORM
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleInitial: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]), // make sure it is a valid email address
    password: new FormControl('', [Validators.required]),
  });

  private authSubscription = new Subscription();

  constructor(private authService: AuthService) {}
  // On Submit Function
  onSubmit() {
    if (this.registerForm.invalid) return;
    console.log(this.registerForm.value);
    console.log(this.registerForm.value.phoneNumber);

    this.authSubscription.add(
      this.authService
        .registerUser(
          this.registerForm.value.firstName,
          this.registerForm.value.middleInitial,
          this.registerForm.value.lastName,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.role,
          this.registerForm.value.phoneNumber
        )
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
