/* eslint-disable @nx/enforce-module-boundaries */
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
          import('@my-workspace/orders/features/feature-order-list').then(
            (m) => m.OrderList
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('@my-workspace/orders/features/feature-checkout').then(
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
          import('@my-workspace/users/features/feature-auth').then(
            (m) => m.Login
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('@my-workspace/users/features/feature-profile').then(
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
          import('@my-workspace/catalog/features/feature-browse').then(
            (m) => m.Browse
          ),
      },
      {
        path: 'detail',
        loadComponent: () =>
          import('@my-workspace/catalog/features/feature-detail').then(
            (m) => m.Detail
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
];
