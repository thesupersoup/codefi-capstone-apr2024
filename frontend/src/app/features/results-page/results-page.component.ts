import { Component } from '@angular/core';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss'
})
export class ResultsPageComponent {


  isContractorView = true

  switch() {
   this.isContractorView = !this.isContractorView

   console.log(this.isContractorView)
  }
}
