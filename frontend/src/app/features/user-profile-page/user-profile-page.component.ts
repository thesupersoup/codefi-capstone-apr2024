import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { TagService } from '../../shared/services/tag.service';
import { TagViewModel } from '../../shared/models/tag.model';
import {
  EmailValidator,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    profilePicture: '',
  };
  onFileSelected: any;
  tags: TagViewModel[];
  tagID: string;
  routerLink: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private tagService: TagService,
    private http: HttpClient
  ) {}
  // ONINIT: PULL LOGO IMG TO SET DEFUALT PROFILE PIC
  ngOnInit() {
    this.userService.getUserData().subscribe((res) => {
      this.user = res.data;

      if (!this.user.profilePicture) {
        this.user.profilePicture =
          'https://res.cloudinary.com/dp38tcyrv/image/upload/v1715038251/profile_pictures/tmp-1-1715038249581_pyeru2.webp';
      }
    });
  }
  //IMG UPLOAD FUNCTION
  selectedFile: File = null;

  imgChange(event) {
    this.onFileSelected = <File>event.target.files[0];

    this.onUpload();
  }

  onUpload() {
    const fd = new FormData();
    fd.append('img', this.onFileSelected, this.onFileSelected.name);

    this.http
      .post('http://localhost:5000/api/v1/users/upload-image', fd, {
        withCredentials: true,
      })
      .subscribe((res: any) => {
        const newImgUrl = res.data.src;

        this.user.profilePicture = newImgUrl;

        this.http
          .patch(
            'http://localhost:5000/api/v1/users/' + this.user.id,
            {
              profilePic: newImgUrl,
            },
            { withCredentials: true }
          )
          .subscribe((res2) => {});
      });
  }
  // ADD TAG FUCTION
  createTagFromUser() {
    const tagType = this.addTagForm.value;
    this.tagService.createTag(tagType).subscribe((res) => {});
  }
  // DELETE TAG
  deleteTagFromUser(_id) {
    this.tagService.removeTagFromUser(_id).subscribe((res) => {});
  }
  // CREATE ADD TAG FORM
  addTagForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  // PASSWORD CHANGE REROUTE FUNCTION
  changePassword() {
    this.router.navigate(['/resetPassword']);
  }
  //TODO: FIX THIS SHIT
  autoSearch() {
    const searchResults = this.tagService
      .getTagsByName(this.addTagForm.value.name)
      .subscribe((res) => {
        this.tags = res;
      });
  }

  isDisplayed = true;

  showMe() {
    if (this.isDisplayed) {
      this.isDisplayed = false;
    } else {
      this.isDisplayed = true;
    }
  }
}

// MAIN TO DOS
//TODO: add tag to local storage to show while hitting backend
//TODO: profile img reload on navbar

// SECONDARY TO DOS
//TODO: disable add tag button at 5 tags
