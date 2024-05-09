import { Component } from '@angular/core';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrl: './results-page.component.scss'
})
export class ResultsPageComponent {
  isAuthorized = true;
  isContractor = true;
  isFreelancer = false;

  // Need Logic to Switch Views
}
