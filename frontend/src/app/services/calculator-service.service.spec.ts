import { TestBed } from '@angular/core/testing';
import { CalculatorServiceService } from './calculator-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CalculatorServiceService', () => {
  let service: CalculatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]  // <-- KLUCZOWE
    });

    service = TestBed.inject(CalculatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
