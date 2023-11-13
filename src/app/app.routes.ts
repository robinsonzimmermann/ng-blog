import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: ':year/:month/:day/:permalink',
    loadChildren: () => import('./features/post/post.module').then(m => m.PostModule),
  }
];
