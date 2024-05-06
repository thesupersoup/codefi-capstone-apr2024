import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { VerifyComponent } from './features/auth/verify/verify.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { ResultsPageComponent } from './features/results-page/results-page.component';
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
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
