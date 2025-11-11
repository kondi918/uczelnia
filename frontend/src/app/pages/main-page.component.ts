import { Component } from '@angular/core';
import { CalculatorComponentComponent } from "../components/calculator-component.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CalculatorComponentComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

}
