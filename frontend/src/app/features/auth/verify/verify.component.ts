import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}
  isSuccess: Boolean = false;
  isError: Boolean = false;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // pull the values of the email and token from the params
      const email = params['email'];
      const token = params['token'];
      this.authService.verifyEmail(email, token).subscribe(
        (response) => {
          this.isSuccess = true;
          console.log(response);
        },
        (error) => {
          this.isError = true;
          console.error('Error:', error); // Handle error
        }
      );
    });
  }
}
