import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling({
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(MarkdownModule.forRoot({ loader: HttpClient }))
  ],
};
