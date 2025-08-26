import { Routes } from '@angular/router';
import { AdminLayout } from '@admin/layout/components/layout';
import { Home } from '@public/pages/home/home';
import { Notfound } from '@admin/notfound/notfound';
import { Dashboard } from '@admin/dashboard/dashboard';
import { PublicLayout } from '@public/layout/layout';
import { Courses } from '@public/pages/courses/courses';

export const appRoutes: Routes = [
  // Public page routes
  {
    path: '',
    component: PublicLayout,
    children: [
      { path: '', component: Home },
      { path: 'cursos', component: Courses },
    ],
  },

  // Private admin page routes
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminLayout,
        children: [
          { path: 'dashboard', component: Dashboard },
          { path: 'cruds', loadChildren: () => import('@admin/pages.routes') },
        ],
      },
    ],
  },

  // Authentication routes
  { path: '', loadChildren: () => import('@admin/auth/auth.routes') },

  { path: 'notfound', component: Notfound },
  { path: '**', redirectTo: '/notfound' },
];
