import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/moviePage/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/moviePage/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'movies',
        loadComponent: () => import('./features/moviePage/movies-list/movies-list.component').then(m => m.MoviesListComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
