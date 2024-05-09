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
  selector: 'app-freelancer-home',
  templateUrl: './freelancer-home.component.html',
  styleUrl: './freelancer-home.component.scss',
})
export class FreelancerHomeComponent {
  tags: any[];
  searchForManagersForm = new FormGroup({
    tag: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tagService: TagService
  ) {}

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
    if (this.searchForManagersForm.invalid) return;

    if (this.searchForManagersForm.valid) {
      const formValue = this.searchForManagersForm.getRawValue();
    } else {
      return;
    }
  }
}
