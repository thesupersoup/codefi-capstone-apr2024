import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-msg',
  templateUrl: './success-msg.component.html',
  styleUrl: './success-msg.component.scss',
})
export class SuccessMsgComponent {
  @Input() message: string = '';
  show: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  display() {
    this.show = true;
    setTimeout(() => this.hide(), 3000); // Auto-hide after 3 seconds
  }

  hide() {
    this.show = false;
  }
}
