import { bootstrapApplication } from '@angular/platform-browser';
import { MainPageComponent } from './app/pages/main-page.component';
import { appConfig } from './app/app.config';

bootstrapApplication(MainPageComponent, appConfig)
  .catch(err => console.error('BOOTSTRAP ERROR:', err));