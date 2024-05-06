import { Component } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  isContractorView = true;
  switch() {
   this.isContractorView = !this.isContractorView
  }
}
