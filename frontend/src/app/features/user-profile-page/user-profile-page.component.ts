import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';
import { AuthService } from '../../shared/services/auth.service';
import { map } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { TagService } from '../../shared/services/tag.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  user?: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tagService: TagService
  ) {}
  ngOnInit() {
    return this.authService.me().pipe(
      map((res) => {
        const user = res.data.user;
        // return this.tagService.getTagById;
      })
    );
  }
}

//TODO: add password change/reset logic
//TODO: add/delete tag function
//TODO: Add logic from tag service

//TODO: check svg for html edit tag buttons
//user.tags.length<5
