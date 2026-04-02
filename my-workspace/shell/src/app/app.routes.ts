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
  {
    path: 'result-matrix',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        loadComponent: () =>
          import('@oper/rm').then((m) => m.ResultMatrixList),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('@oper/rm').then((m) => m.ResultMatrixDetail),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('@oper/rm').then((m) => m.ResultMatrixCreate),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('@oper/rm').then((m) => m.ResultMatrixEdit),
      },
    ],
  },
];
