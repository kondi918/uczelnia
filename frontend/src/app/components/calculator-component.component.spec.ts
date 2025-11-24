import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CalculatorComponentComponent } from './calculator-component.component';
import { CalculatorServiceService } from '../services/calculator-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';

describe('CalculatorComponentComponent', () => {
  let component: CalculatorComponentComponent;
  let fixture: ComponentFixture<CalculatorComponentComponent>;
  let mockCalculatorService: jasmine.SpyObj<CalculatorServiceService>;

  beforeEach(async () => {
    mockCalculatorService = jasmine.createSpyObj('CalculatorServiceService', ['Calculate']);

    await TestBed.configureTestingModule({
      imports: [
        CalculatorComponentComponent,
        ErrorModalComponent,
        HttpClientTestingModule
      ],
    })
      .overrideComponent(CalculatorComponentComponent, {
        remove: { providers: [CalculatorServiceService] },
        add: { providers: [{ provide: CalculatorServiceService, useValue: mockCalculatorService }] }
      })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ------------------------------------------------------
  // NUMBER BUTTON
  // ------------------------------------------------------

  it('should append numbers correctly', () => {
    component.pressNumber('1');
    component.pressNumber('2');
    expect(component.displayValue).toBe('12');
  });

  it('should ignore second decimal point', () => {
    component.pressNumber('1');
    component.pressNumber('.');
    component.pressNumber('.');
    expect(component.displayValue).toBe('1.');
  });

  // ------------------------------------------------------
  // OPERATOR LOGIC
  // ------------------------------------------------------

  it('should store firstOperand and operator', () => {
    component.pressNumber('8');
    component.pressOperator('+');
    expect(component.firstOperand).toBe(8);
    expect(component.currentOperation).toBe('+');
    expect(component.displayValue).toBe('');
  });

  it('should calculate previous operation before setting a new one', () => {
    component.pressNumber('10');
    component.pressOperator('+');
    component.pressNumber('5');

    mockCalculatorService.Calculate.and.returnValue(of({ result: 15 }));

    component.pressOperator('*');

    expect(mockCalculatorService.Calculate).toHaveBeenCalledWith(10, 5, '+');
    expect(component.firstOperand).toBe(15);
    expect(component.currentOperation).toBe('*');
  });

  // ------------------------------------------------------
  // CALCULATE()
  // ------------------------------------------------------

  it('should call service and update result on success', () => {
    component.pressNumber('5');
    component.pressOperator('+');
    component.pressNumber('7');

    mockCalculatorService.Calculate.and.returnValue(of({ result: 12 }));

    component.calculate();

    expect(mockCalculatorService.Calculate).toHaveBeenCalledWith(5, 7, '+');
    expect(component.displayValue).toBe('12');
    expect(component.firstOperand).toBe(12);
    expect(component.isResultShown).toBeTrue();
  });

  it('should show modal on API error', () => {
    component.pressNumber('3');
    component.pressOperator('/');
    component.pressNumber('0');

    mockCalculatorService.Calculate.and.returnValue(
      throwError(() => ({
        error: { error: 'Divide by Zero' }
      }))
    );

    component.calculate();

    expect(component.showErrorModal).toBeTrue();
    expect(component.errorModalMessage).toContain('API Error!');
    expect(component.errorModalMessage).toContain('Divide by Zero');
  });

  // ------------------------------------------------------
  // AFTER RESULT
  // ------------------------------------------------------

  it('should reset displayValue on next number after result', () => {
    component.displayValue = '100';
    component.isResultShown = true;

    component.pressNumber('5');

    expect(component.displayValue).toBe('5');
    expect(component.isResultShown).toBeFalse();
  });

  // ------------------------------------------------------
  // DELETE / CLEAR
  // ------------------------------------------------------

  it('should clear everything', () => {
    component.displayValue = '100';
    component.firstOperand = 100;
    component.currentOperation = '+';

    component.clearAll();

    expect(component.displayValue).toBe('');
    expect(component.firstOperand).toBeNull();
    expect(component.currentOperation).toBe('');
    expect(component.isResultShown).toBeFalse();
  });

  it('should delete last digit', () => {
    component.displayValue = '123';
    component.deleteLast();
    expect(component.displayValue).toBe('12');
  });

});
