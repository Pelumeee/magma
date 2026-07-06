import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'insights',
    loadComponent: () => import('./pages/insights/insights').then((m) => m.Insights),
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/gallery/gallery').then((m) => m.Gallery),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: 'equipments',
    loadComponent: () => import('./pages/equipments/equipments').then((m) => m.Equipments),
  },
  //   {
  //     path: '**',
  //     loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  //   },
];
