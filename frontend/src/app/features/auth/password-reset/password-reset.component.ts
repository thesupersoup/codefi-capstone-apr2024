import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {
  passwordResetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  isSuccess: Boolean = false;

  private authSubscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .forgotPassword(this.passwordResetForm.value.email)
      .subscribe((res) => {
        this.isSuccess = !!res;
      });
  }
}
