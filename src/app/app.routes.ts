import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(mod => mod.HomeComponent),
  },
  {
    path: ':year/:month/:day/:permalink',
    loadComponent: () => import('./features/post/post.component').then(m => m.PostComponent),
  },
  {
    path: 'unpublished/:permalink',
    loadComponent: () => import('./features/post/post.component').then(m => m.PostComponent),
  }
];
