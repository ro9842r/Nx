import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./home').then((m) => m.Home),
  },
  {
    path: 'orders',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('@my-workspace/orders/features/order-list').then(
            (m) => m.OrderList
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('@my-workspace/orders/features/checkout').then(
            (m) => m.Checkout
          ),
      },
    ],
  },
  {
    path: 'users',
    children: [
      {
        path: 'auth',
        loadComponent: () =>
          import('@my-workspace/users/features/auth').then(
            (m) => m.Login
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('@my-workspace/users/features/profile').then(
            (m) => m.Profile
          ),
      },
    ],
  },
  {
    path: 'catalog',
    children: [
      {
        path: 'browse',
        loadComponent: () =>
          import('@my-workspace/catalog/features/browse').then(
            (m) => m.Browse
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('@my-workspace/catalog/features/detail').then(
            (m) => m.Detail
          ),
      },
    ],
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
          import('@my-workspace/country-strategy/features/list').then(
            (m) => m.CountryStrategyList
          ),
      },
      {
        path: 'detail/:id',
        loadComponent: () =>
          import('@my-workspace/country-strategy/features/detail').then(
            (m) => m.CountryStrategyDetail
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@my-workspace/features/dashboard').then((m) => m.DashboardPage),
  },
  {
    path: 'checkout-flow',
    loadComponent: () =>
      import('@my-workspace/features/checkout-flow').then(
        (m) => m.CheckoutPage
      ),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('@my-workspace/features/user-onboarding').then(
        (m) => m.OnboardingPage
      ),
  },
  {
    path: 'audit/:entityType/:entityId',
    loadComponent: () =>
      import('@my-workspace/audit/features/audit-page').then(
        (m) => m.AuditPage
      ),
  },
];
