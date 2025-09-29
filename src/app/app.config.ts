import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { kanbanReducer, KANBAN_FEATURE_KEY } from './kanban/store/reducer';
import { KanbanEffects } from './kanban/store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState(KANBAN_FEATURE_KEY, kanbanReducer),
    provideEffects([KanbanEffects]),
  ]
};