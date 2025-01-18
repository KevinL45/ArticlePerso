import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { LayoutComponent } from './app/layout/layout/layout.component';

bootstrapApplication(LayoutComponent, appConfig,)
  .catch((err) => console.error(err));
