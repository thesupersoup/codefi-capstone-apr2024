import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { VerifyComponent } from './features/auth/verify/verify.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ResultsPageComponent } from './features/results-page/results-page.component';
import { ContractorHomeComponent } from './features/landing-page/contractor-home/contractor-home.component';
import { FreelancerHomeComponent } from './features/landing-page/freelancer-home/freelancer-home.component';
import { GeneralHomeComponent } from './features/landing-page/general-home/general-home.component';
import { GeneralComponent } from './features/results-page/general/general.component';
import { ContractorComponent } from './features/results-page/contractor/contractor.component';
import { FreelancerComponent } from './features/results-page/freelancer/freelancer.component';
import { FooterComponent } from './features/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    NavbarComponent,
    ResultsPageComponent,
    ContractorHomeComponent,
    FreelancerHomeComponent,
    GeneralHomeComponent,
    GeneralComponent,
    ContractorComponent,
    FreelancerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
