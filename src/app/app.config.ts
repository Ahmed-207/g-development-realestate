import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideAnimations } from "@angular/platform-browser/animations";
import { loadingInterceptor } from './core/interceptors/loading-interceptor';




export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({
      scrollPositionRestoration: 'top'
    })), provideClientHydration(withEventReplay()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    provideHttpClient(withFetch(), withInterceptors([loadingInterceptor])),
    provideFirebaseApp(() => initializeApp(environment.firebase || {})),
    provideFirestore(() => getFirestore()),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
