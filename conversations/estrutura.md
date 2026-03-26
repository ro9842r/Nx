my-workspace/
├── nx.json
├── .eslintrc.json
├── tsconfig.base.json
│
├── apps/
│ ├── shell/
│ │ └── src/
│ │ ├── main.ts
│ │ └── app/
│ │ ├── app.config.ts
│ │ └── app.routes.ts
│ └── shell-e2e/
│
└── libs/
│
├── orders/
│ ├── data-access/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── orders.service.ts
│ │ ├── orders.store.ts
│ │ ├── orders.api.ts
│ │ └── orders.models.ts
│ │
│ ├── ui-components/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── order-card/
│ │ │ └── order-card.component.ts
│ │ └── order-status-badge/
│ │ └── order-status-badge.component.ts
│ │
│ ├── util-validators/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ └── order-validators.ts
│ │
│ └── features/ ← features propias del dominio
│ ├── feature-order-list/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── order-list.component.ts
│ │ ├── order-list.component.html
│ │ └── order-list.routes.ts
│ │
│ └── feature-checkout/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── checkout.component.ts
│ ├── checkout.component.html
│ └── checkout.routes.ts
│
├── users/
│ ├── data-access/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── auth.service.ts
│ │ ├── auth.store.ts
│ │ └── user.models.ts
│ │
│ ├── ui-components/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ └── avatar/
│ │ └── avatar.component.ts
│ │
│ ├── util-validators/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ └── user-validators.ts
│ │
│ └── features/
│ ├── feature-profile/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── profile.component.ts
│ │ └── profile.routes.ts
│ │
│ └── feature-auth/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── login.component.ts
│ ├── login.component.html
│ └── auth.routes.ts
│
├── catalog/
│ ├── data-access/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── catalog.service.ts
│ │ ├── catalog.store.ts
│ │ ├── catalog.api.ts
│ │ └── catalog.models.ts
│ │
│ ├── ui-components/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── product-card/
│ │ │ └── product-card.component.ts
│ │ └── product-badge/
│ │ └── product-badge.component.ts
│ │
│ ├── util-validators/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ └── catalog-validators.ts
│ │
│ └── features/
│ ├── feature-browse/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── browse.component.ts
│ │ ├── browse.component.html
│ │ └── browse.routes.ts
│ │
│ └── feature-detail/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── detail.component.ts
│ ├── detail.component.html
│ └── detail.routes.ts
│
├── features/ ← features cross-dominio
│ ├── checkout-flow/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── checkout-page.component.ts
│ │ ├── checkout-page.component.html
│ │ └── checkout-flow.routes.ts
│ │
│ ├── dashboard/
│ │ ├── project.json
│ │ └── src/
│ │ ├── index.ts
│ │ └── lib/
│ │ ├── dashboard-page.component.ts
│ │ ├── dashboard-page.component.html
│ │ └── dashboard.routes.ts
│ │
│ └── user-onboarding/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── onboarding-page.component.ts
│ └── onboarding.routes.ts
│
└── shared/
├── ui/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── button/
│ │ ├── button.component.ts
│ │ └── button.component.stories.ts
│ ├── input/
│ │ └── input.component.ts
│ └── modal/
│ └── modal.component.ts
│
├── util-http/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── api.interceptor.ts
│ └── error.interceptor.ts
│
├── util-auth/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── auth.guard.ts
│ └── token.service.ts
│
├── interfaces/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ ├── pagination.interface.ts
│ └── api-response.interface.ts
│
├── store/
│ ├── project.json
│ └── src/
│ ├── index.ts
│ └── lib/
│ └── router.store.ts
│
└── i18n/
├── project.json
└── src/
└── lib/
├── en.json
└── es.json
