import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '../../../shared/services/tag.service';

@Component({
  selector: 'app-general-home',
  templateUrl: './general-home.component.html',
  styleUrl: './general-home.component.scss',
})
export class GeneralHomeComponent {
  isContractorViewEnabled = true;
  tags: any[];

  searchForFreelancersForm = new FormGroup({
    tag: new FormControl('', [Validators.required]),
  });

  searchForManagersForm = new FormGroup({
    tag: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tagService: TagService
  ) {}

  autoFreelancerSearch() {
    const searchFreeResults = this.tagService
      .getTagsByName(this.searchForFreelancersForm.value.tag)
      .subscribe((res) => {
        console.log(res);
        this.tags = res;
      });

    console.log(this.tags);
    // console.log(searchFreeResults);
    // return searchFreeResults;
  }

  autoContractorSearch() {
    const searchContResults = this.tagService
      .getTagsByName(this.searchForManagersForm.value.tag)
      .subscribe((res) => {
        console.log(res);
        this.tags = res;
      });
  }

  // Submit Function
  onSubmit() {
    if (
      this.searchForFreelancersForm.invalid &&
      this.searchForManagersForm.invalid
    )
      return;

    if (this.searchForFreelancersForm.valid) {
      const formValue = this.searchForFreelancersForm.getRawValue();
    }
    if (this.searchForManagersForm.valid) {
      const formValue = this.searchForManagersForm.getRawValue();
    } else {
      return;
    }
  }

  switch() {
    this.isContractorViewEnabled = !this.isContractorViewEnabled;
  }
}
