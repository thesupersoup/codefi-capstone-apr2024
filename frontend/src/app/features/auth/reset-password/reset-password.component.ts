import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  email: String;
  token: String;

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  isSuccess: Boolean = false;
  isError: Boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // pull the values of the email and token from the params
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  onSubmit() {
    this.isError = false;
    this.isSuccess = false;
    if (
      this.resetPasswordForm.value.password !=
      this.resetPasswordForm.value.confirmPassword
    ) {
      this.isError = true;
      return;
    }
    this.authService
      .resetPassword(
        this.email,
        this.resetPasswordForm.value.password,
        this.token
      )
      .subscribe((res) => {
        if (res) {
          this.isSuccess = true;
          this.router.navigate(['/login']);
        } else {
          this.isError = true;
        }
      });
  }
}
