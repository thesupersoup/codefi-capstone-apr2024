import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TagService } from '../../../shared/services/tag.service';
import { TagViewModel } from '../../../shared/models/tag.model';

@Component({
  selector: 'app-freelancer-home',
  templateUrl: './freelancer-home.component.html',
  styleUrl: './freelancer-home.component.scss',
})
export class FreelancerHomeComponent {
  tags: TagViewModel[];
  tagID: string;

  searchForm = new FormGroup({
    tag: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tagService: TagService
  ) {}

  autoSearch() {
    const searchResults = this.tagService
      .getTagsByName(this.searchForm.value.tag)
      .subscribe((res) => {
        this.tags = res;
      });
  }

  setValue(id) {
    this.tagID = id
    return this.tagID
  }

  // Submit Function
  onSubmit() {
    console.log("1", this.tagID)
    if (this.searchForm.invalid) return;

    if (this.searchForm.valid) {
      const formValue = this.searchForm.controls.tag.setValue(this.tagID);
      console.log(this.tagID)
      this.router.navigate([`/results/${this.tagID}`])
    } else {
      return;
    }
  }
}
