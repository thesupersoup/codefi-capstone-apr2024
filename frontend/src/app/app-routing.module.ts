import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ResultsPageComponent } from './features/results-page/results-page.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { VerifyComponent } from './features/auth/verify/verify.component';
import { UserProfilePageComponent } from './features/user-profile-page/user-profile-page.component';
import path from 'path';
import { GeneralHomeComponent } from './features/landing-page/general-home/general-home.component';
import { FreelancerComponent } from './features/results-page/freelancer/freelancer.component';
import { FreelancerHomeComponent } from './features/landing-page/freelancer-home/freelancer-home.component';
import { ContractorHomeComponent } from './features/landing-page/contractor-home/contractor-home.component';
import { GeneralComponent } from './features/results-page/general/general.component';
import { ContractorComponent } from './features/results-page/contractor/contractor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'verify',
    component: VerifyComponent,
  },
  {
    path: 'results/:id',
    component: ResultsPageComponent,
  },
  { path: 'userprofile', component: UserProfilePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
