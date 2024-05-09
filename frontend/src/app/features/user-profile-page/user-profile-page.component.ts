import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
// export class UserProfilePageComponent {
  // CREATE PROFILE FORM 1
  // userProfileForm1 = new FormGroup({
  //   img: new FormControl(''),
  //   name: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   phone: new FormControl('', [Validators.required]),
  //   role: new FormControl('', [Validators.required]),
  // });

  // CREATE PROFILE FORM 2
//   userProfileForm2 = new FormGroup({
//     tag1: new FormControl(''),
//     tag2: new FormControl(''),
//     tag3: new FormControl(''),
//     tag4: new FormControl(''),
//     tag5: new FormControl(''),
//   });
// }

//TODO: add auto gen name/email/phone/role/profile pic pull userID from backend
//TODO: add password change/reset logic
//TODO: add/edit tag function
//TODO: check svg for html edit tag buttons
