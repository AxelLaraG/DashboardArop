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
        loadComponent: () => import('./features/dashboard/views/home/home').then((m) => m.Home),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/dashboard/views/users/users').then((m) => m.Users),
      },
      {
        path: 'products',
        loadComponent: () => import('./features/dashboard/views/products/products').then((m) => m.Products),
      },
      {
        path:'shops',
        loadComponent: () => import('./features/dashboard/views/shops/shops').then((m) => m.Shops),
      },
      {
        path:'shop/:id',
        loadComponent: () => import('./features/dashboard/views/shop/shop').then((m) => m.Shop),
      },
      {
        path:'orders',
        loadComponent: () => import('./features/dashboard/views/orders/orders').then((m) => m.Orders),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
