import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home').then((m) => m.Home),
  },
  {
    path: 'country-strategy',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('@oper/cs').then((m) => m.CountryStrategyList),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('@oper/cs').then((m) => m.CountryStrategyDetail),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('@oper/cs').then((m) => m.CountryStrategyCreate),
      },
    ],
  },
];
