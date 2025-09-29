import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'kanban', pathMatch: 'full' },
  {
    path: 'kanban',
    loadComponent: () =>
      import('./kanban/components/board/board.component').then(m => m.BoardComponent)
  },
];
