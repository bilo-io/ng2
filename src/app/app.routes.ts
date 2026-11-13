import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  { path: '', component: Home, title: 'ng2' },
  { path: 'home', redirectTo: '' },
  // MapLibre is large, so the pages that use it load on demand.
  {
    path: 'map',
    title: 'Map · ng2',
    loadComponent: () => import('./pages/map/map-page').then((m) => m.MapPage),
  },
  {
    path: 'ws',
    title: 'Ws components · ng2',
    loadComponent: () => import('./pages/ws-demo/ws-demo').then((m) => m.WsDemo),
  },
  {
    path: '**',
    title: 'Not found · ng2',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
