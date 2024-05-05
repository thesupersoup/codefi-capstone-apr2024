import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-freelancer-home',
  templateUrl: './freelancer-home.component.html',
  styleUrl: './freelancer-home.component.scss'
})
export class FreelancerHomeComponent {
  searchForFreelancersForm = new FormGroup({
    tag: new FormControl("", [Validators.required])
  });

  searchForManagersForm = new FormGroup({
    tag: new FormControl("", [Validators.required])
  })

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  // Submit Function
  onSubmit() {
   if (this.searchForFreelancersForm.invalid && this.searchForManagersForm.invalid) return;

   if (this.searchForFreelancersForm.valid) {
    const formValue = this.searchForFreelancersForm.getRawValue();
   } if (this.searchForManagersForm.valid) {
    const formValue = this.searchForManagersForm.getRawValue();
   } else {
    return
   }
  }
}
