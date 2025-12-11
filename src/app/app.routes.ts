import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './core/services/auth';
import { Router } from '@angular/router';

const authGuard = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.isAuth()) {
    return true;
  }
  return router.parseUrl('/auth/login');
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/dashboard/home/home').then((m) => m.Home),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/dashboard/users/users').then((m) => m.Users),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
