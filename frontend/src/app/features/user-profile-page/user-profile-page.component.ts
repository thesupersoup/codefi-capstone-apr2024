import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/services/user.service';
import { TagService } from '../../shared/services/tag.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';

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

  constructor(
    private userService: UserService,
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

        console.log(this.user.id);

        this.http
          .patch(
            'http://localhost:5000/api/v1/users/' + this.user.id,
            {
              profilePic: newImgUrl,
            },
            { withCredentials: true }
          )
          .subscribe((res2) => {
            console.log('RES2', res2);
          });
      });
  }
  // ADD TAG FUCTION

  // DELETE TAG
  deleteTagFromUser(_id) {
    this.tagService.removeTagFromUser(_id).subscribe((res) => {});
  }
  // CREATE ADD TAG FORM
  // addTagForm = new FormGroup({
  //   text: new FormControl('', [Validators.required]),
  //   submitButton: new FormControl('', [Validators.required]),
  // });

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
//TODO: add password change/reset logic
//TODO: add tag function (form builder throwing err)
//TODO: build form

// SECONDARY TO DOS
//TODO: check svg for html edit tag buttons
//TODO: disable add tag button at 5 tags
