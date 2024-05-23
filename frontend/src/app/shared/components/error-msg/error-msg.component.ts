import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
})
export class ErrorMsgComponent {
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
