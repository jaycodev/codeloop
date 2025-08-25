import { Routes } from '@angular/router';
import { AppLayout } from './admin/layout/component/app.layout';
import { Landing } from './admin/pages/landing/landing';
import { Notfound } from './admin/pages/notfound/notfound';
import { Dashboard } from './admin/pages/dashboard/dashboard';

export const appRoutes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AppLayout,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'cruds', loadChildren: () => import('./admin/pages/pages.routes') }
        ]
      },
      { path: '', component: Landing },
      { path: 'auth', loadChildren: () => import('./admin/pages/auth/auth.routes') },
    ]
  },
  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' }
];
