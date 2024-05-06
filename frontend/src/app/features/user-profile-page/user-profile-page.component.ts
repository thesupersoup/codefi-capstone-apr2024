import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent {}
// CREATE USER PROFILE PAGE

//TODO: add auto gen name/email/phone/role/profile pic pull userID from backend
//TODO: add password change/reset logic
//TODO: add/edit tag function
//TODO: check svg for html edit tag buttons
