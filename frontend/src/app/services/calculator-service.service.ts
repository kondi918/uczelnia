import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getBaseApiUrl } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {

  constructor(private http: HttpClient) {} // <- HttpClient przez konstruktor
  private baseUrl = getBaseApiUrl();

  Calculate(a: number, b: number, operacja: string): Observable<{ result: number }> {
    const params = new HttpParams()
      .set('a', a)
      .set('b', b)
      .set('operation', operacja);

    console.log(this.baseUrl);
    console.log(`${this.baseUrl}/CalculatorController/Calculate?a=${a}&b=${b}&operation=${operacja}`);

    return this.http.get<{ result: number }>(`${this.baseUrl}/Calculator/Calculate`, { params });
  }
}
