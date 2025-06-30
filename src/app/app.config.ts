import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './shared/requestInterceptors/requestInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideAnimations(),  provideToastr(),{ provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }]
};
