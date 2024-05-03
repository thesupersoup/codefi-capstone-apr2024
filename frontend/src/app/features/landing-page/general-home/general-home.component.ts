import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-home',
  templateUrl: './general-home.component.html',
  styleUrl: './general-home.component.scss'
})
export class GeneralHomeComponent {
isContractorViewEnabled = true

searchforFreelancersForm = new FormGroup({
  tag: new FormControl("", [Validators.required])
});

searchforManagersForm = new FormGroup({
  tag: new FormControl("", [Validators.required])
})

constructor(
  private formBuilder: FormBuilder,
  private router: Router
) {}

// Submit Function
onSubmit() {
 if (this.searchforFreelancersForm.invalid && this.searchforManagersForm.invalid) return;

 if (this.searchforFreelancersForm.valid) {
  const formValue = this.searchforFreelancersForm.getRawValue();
 } if (this.searchforManagersForm.valid) {
  const formValue = this.searchforManagersForm.getRawValue();
 } else {
  return
 }
}

 switch() {
  this.isContractorViewEnabled = !this.isContractorViewEnabled
 }
}
