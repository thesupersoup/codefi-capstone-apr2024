import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  isSuccess: Boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (
      this.resetPasswordForm.value.password !=
      this.resetPasswordForm.value.confirmPassword
    ) {
      return;
    }
    this.authService
      .resetPassword(
        this.resetPasswordForm.value.email,
        this.resetPasswordForm.value.password
      )
      .subscribe((res) => {
        this.isSuccess = !!res;
      });
  }
}
