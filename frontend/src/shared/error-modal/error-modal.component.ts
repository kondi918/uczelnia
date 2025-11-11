import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
})
export class ErrorModalComponent {
  @Input() message: string = 'Error occurred!';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
