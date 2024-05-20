import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  user?: any;
  isAuthorized: boolean;
  isContractor: boolean;
  isFreelancer: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.me().subscribe((res) => {
      this.user = res.data;

      if (this.user) {
        this.isAuthorized = true;
        if (this.user.role === 'FREELANCER') {
          this.isFreelancer = true;
        } else if (this.user.role === 'CONTRACTOR') {
          this.isContractor = true;
        } else {
          this.isFreelancer = false;
          this.isContractor = false;
          this.isAuthorized = false;
        }
      } else {
        this.isAuthorized = false;
      }
    });
  }
}
