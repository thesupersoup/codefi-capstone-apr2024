import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { TagService } from '../../shared/services/tag.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  user?: any;

  constructor(
    private userService: UserService,
    private tagService: TagService
  ) {}
  ngOnInit() {
    this.userService.getUserData().subscribe((res) => {
      this.user = res.data;
      if (!this.user.profilePicture) {
        this.user.profilePicture =
          'https://res.cloudinary.com/dp38tcyrv/image/upload/v1715038251/profile_pictures/tmp-1-1715038249581_pyeru2.webp';
      }
    });
  }
  deleteTagFromUser(_id) {
    this.tagService.removeTagFromUser(_id).subscribe((res) => {});
  }
}

//TODO: add password change/reset logic

//TODO: add tag function

//TODO: check svg for html edit tag buttons

//TODO: disable add tag button at 5 tags
