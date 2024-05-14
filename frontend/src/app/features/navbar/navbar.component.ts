import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isAuthenticated = false;
  isFreelancer = false;
  isContractor = false;
  welcomeString: string = 'Welcome to Local Lancer';
  profilePic: string =
    'https://res.cloudinary.com/dp38tcyrv/image/upload/v1715639308/profile_pictures/icon_xibn9y.jpg';

  authSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.authSubscription = this.authService.me().subscribe(
          (res) => {
            const user = res.data;
            this.welcomeString = `Welcome, ${user.firstName} ${user.lastName}`;
            this.profilePic = user.profilePic;
            this.isAuthenticated = true;

            if (user.role === 'FREELANCER') {
              this.isFreelancer = true;
            }
            if (user.role === 'CONTRACTOR') {
              this.isContractor = true;
            }
          },
          (error) => {
            this.isAuthenticated = false;
          }
        );
      }
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.isFreelancer = false;
    this.isContractor = false;
    location.reload();
    this.authService.logoutUser().subscribe((res) => {
      this.router.navigate(['/']);
    });
  }
}
