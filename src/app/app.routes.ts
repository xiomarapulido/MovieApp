import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/movieApp/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadComponent: () => import('./features/movieApp/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'movies',
        loadComponent: () => import('./features/movieApp/movies-list/movies-list.component').then(m => m.MoviesListComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
