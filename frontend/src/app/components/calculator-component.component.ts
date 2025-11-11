import { Component, inject } from '@angular/core';
import { CalculatorServiceService } from '../services/calculator-service.service';
import { FormsModule } from '@angular/forms';
import { ErrorModalComponent } from "../../shared/error-modal/error-modal.component";

@Component({
  selector: 'app-calculator-component',
  standalone:true,
  imports: [FormsModule, ErrorModalComponent],
  templateUrl: './calculator-component.component.html',
  styleUrls: ['./calculator-component.component.scss']
})
export class CalculatorComponentComponent {
  displayValue: string = ''; // aktualnie wyświetlany tekst
  firstOperand: number | null = null;
  secondOperand: number | null = null;
  currentOperation: string | null = null;
  isResultShown: boolean = false;
  errorMessage: string | null = null;
  showErrorModal: boolean = false;
  errorModalMessage: string = '';

  get currentExpression(): string {
  if (this.firstOperand !== null && this.currentOperation && !this.isResultShown) {
    return `${this.firstOperand} ${this.currentOperation} ${this.displayValue}`;
  } else if (this.firstOperand !== null && this.isResultShown) {
    return `${this.firstOperand} ${this.currentOperation || ''} ${this.secondOperand ?? ''}`;
  }
  return '';
}


  constructor(private calculatorService: CalculatorServiceService) {}

  pressNumber(num: string) {
  if (this.isResultShown) {
    this.displayValue = '';
    this.isResultShown = false;
  }

  if (num === '.' && this.displayValue.includes('.')) {
    return;
  }

  if (num === '0' && this.displayValue === '0') return;
  if (num !== '.' && this.displayValue === '0') {
    this.displayValue = num;
    return;
  }

  this.displayValue += num;
}


  pressOperator(op: string) {
    if (this.displayValue === '') return;

    if (this.firstOperand !== null && this.currentOperation && !this.isResultShown) {
      this.calculate();
    } else {
      this.firstOperand = parseFloat(this.displayValue);
    }

    this.currentOperation = op;
    this.displayValue = '';
  }

  calculate() {
  if (this.firstOperand === null || this.currentOperation === null || this.displayValue === '') return;

  this.secondOperand = parseFloat(this.displayValue);

  this.calculatorService
    .Calculate(this.firstOperand, this.secondOperand, this.currentOperation)
    .subscribe({
      next: (res) => {
        this.displayValue = res.result.toString();
        this.firstOperand = res.result;
        this.isResultShown = true;
      },
      error: (err) => {
        console.error('Calculation error:', err);
        this.showErrorModal = true;
        this.errorModalMessage = 'Błąd połączenia z backendem!';
      }
    });
}

closeErrorModal() {
  this.showErrorModal = false;
}

  clearAll() {
    this.displayValue = '';
    this.firstOperand = null;
    this.secondOperand = null;
    this.currentOperation = null;
    this.isResultShown = false;
    this.errorMessage = null;
  }

  deleteLast() {
    if (this.displayValue && !this.isResultShown) {
      this.displayValue = this.displayValue.slice(0, -1);
    }

  }
}
