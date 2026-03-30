# Nx Modular Monolith POC — Project Overview

## 1. Objetivo do Projeto

Este projeto e um **Proof of Concept (POC)** que demonstra como estruturar uma aplicacao frontend corporativa usando a arquitetura de **Modular Monolith** dentro de um **monorepo Nx**. A proposta e mostrar que e possivel ter separacao clara de dominios, fronteiras de modulos enforced por lint, lazy loading granular e escalabilidade organizacional — tudo dentro de um unico repositorio.

---

## 2. Stack Tecnologico

| Camada | Tecnologia | Versao |
|--------|-----------|--------|
| **Monorepo** | Nx | 22.6.1 |
| **Framework** | Angular (standalone) | 21.2.x |
| **Linguagem** | TypeScript | ~5.9 |
| **Estilizacao** | Tailwind CSS + SCSS | 3.x |
| **State Management** | @ngrx/signals + @ngrx/store | 21.1.x |
| **Testes Unitarios** | Vitest (vitest-angular) | 4.x |
| **Testes E2E** | Playwright | 1.36+ |
| **Lint** | ESLint (flat config) + @nx/eslint-plugin | 9.x |
| **Formatacao** | Prettier (singleQuote) | - |
| **Build** | @angular/build + ng-packagr-lite | - |
| **Package Manager** | npm | - |

---

## 3. Arquitetura Geral

```
my-workspace/
├── shell/                  # Aplicacao Angular host (SPA principal)
├── shell-e2e/              # Testes E2E com Playwright
├── libs/
│   ├── orders/             # Dominio: Pedidos
│   ├── users/              # Dominio: Usuarios
│   ├── catalog/            # Dominio: Catalogo de Produtos
│   ├── audit/              # Dominio: Auditoria
│   ├── country-strategy/   # Dominio: Estrategia por Pais
│   ├── features/
│   │   ├── dashboard/      # Feature cross-domain: Dashboard
│   │   ├── checkout-flow/  # Feature cross-domain: Fluxo de Checkout
│   │   └── user-onboarding/# Feature cross-domain: Onboarding
│   └── shared/
│       ├── interfaces/     # Contratos e tipos compartilhados
│       ├── store/          # Factory de store (signal-based)
│       ├── ui/             # Componentes UI reutilizaveis
│       ├── i18n/           # Internacionalizacao (dicionario simples)
│       ├── util-auth/      # Utilitario de token de autenticacao
│       └── util-http/      # Utilitario de construcao de URLs
├── nx.json                 # Configuracao do Nx
├── tsconfig.base.json      # Path aliases do workspace
├── eslint.config.mjs       # Module boundary rules
└── package.json            # Dependencias e metadados
```

---

## 4. Aplicacoes (2)

### 4.1 Shell (Host Application)

- **Caminho:** `shell/`
- **Tipo:** Angular standalone app
- **Porta:** `http://localhost:4200`
- **Responsabilidade:** Ponto de entrada da SPA. Configura o router e lazy-loads todos os modulos de feature vindos de `libs/`.
- **Tags Nx:** `npm:public`, `domain:cross`, `type:infra`
- **Componentes proprios:** `App` (root com `<router-outlet>`), `Home` (hub de navegacao)

### 4.2 Shell-E2E

- **Caminho:** `shell-e2e/`
- **Tipo:** Playwright E2E test project
- **Dependencia implicita:** `shell`
- **Cenarios:** Navegacao home, login -> dashboard, catalog browse/detail, orders list/checkout

---

## 5. Bibliotecas de Dominio (5)

Cada dominio segue uma **estrutura interna padronizada**:

```
libs/<domain>/
├── core/           # API (data access), Models, Service, Store
├── features/       # Componentes de pagina (lazy-loaded)
│   ├── feature-*   # Cada feature e um entry point independente
├── ui-components/  # Componentes UI especificos do dominio
├── util-validators/ # Funcoes de validacao do dominio
└── src/            # Barrel exports (index.ts)
```

### 5.1 Orders (`libs/orders`)

| Camada | Conteudo |
|--------|----------|
| **Models** | `Order`, `OrderStatus`, `NewOrderInput` |
| **API** | `OrdersApi` — CRUD in-memory com array local |
| **Service** | `OrdersService` — cache com TTL, invalidacao ao criar |
| **Store** | `OrdersStore` — estado reativo com signals |
| **Features** | `OrderList` (listagem), `Checkout` (criacao de pedido) |
| **UI** | `OrderCard`, `OrderStatusBadge` |
| **Validators** | `isValidOrderStatus()`, `isValidOrderTotal()` |
| **Tags** | `domain:orders`, `type:domain` |

### 5.2 Users (`libs/users`)

| Camada | Conteudo |
|--------|----------|
| **Models** | `User` |
| **Service** | `AuthService` — login demo |
| **Store** | `AuthStore` |
| **Features** | `Login` (autenticacao), `Profile` (perfil do usuario) |
| **UI** | `Avatar` |
| **Validators** | `isValidEmail()`, `isStrongPassword()` |
| **Tags** | `domain:users`, `type:domain` |

### 5.3 Catalog (`libs/catalog`)

| Camada | Conteudo |
|--------|----------|
| **Models** | `Product`, `ProductReadModel` |
| **API** | `CatalogApi` — listagem/busca por ID in-memory |
| **Service** | `CatalogService` |
| **Store** | `CatalogStore` |
| **Features** | `Browse` (listagem), `Detail` (detalhe com link para audit) |
| **UI** | `ProductCard`, `ProductBadge` |
| **Validators** | `isValidSku()`, `isValidPrice()` |
| **Tags** | `domain:catalog`, `type:domain` |

### 5.4 Audit (`libs/audit`)

| Camada | Conteudo |
|--------|----------|
| **Models** | Audit context, change sets, changes, snapshots, optimistic concurrency (etag/412) |
| **API** | `AuditApi` — historico seeded para `country-strategy:64`, versionamento com etag, `simulateExternalUpdate` |
| **Service** | `AuditService` — load, list changes, save com tratamento de conflito |
| **Store** | `AuditStore` — signals |
| **Features** | `AuditPage` — rota: `/audit/:entityType/:entityId` |
| **Tags** | `domain:audit`, `type:domain` |

### 5.5 Country Strategy (`libs/country-strategy`)

| Camada | Conteudo |
|--------|----------|
| **Models** | `CountryStrategy`, `CountryStrategySummary`, `StrategyStatus` |
| **API** | `CountryStrategyApi` — dados in-memory |
| **Service** | `CountryStrategyService` — cache de 30s, `load`, `loadById` |
| **Store** | `CountryStrategyStore` |
| **Features** | `CountryStrategyList` (listagem), `CountryStrategyDetail` (detalhe com link para audit) |
| **Tags** | `domain:country-strategy`, `type:domain` |

---

## 6. Features Cross-Domain (3)

Estas libraries agregam servicos de multiplos dominios:

| Feature | Caminho | Importa de |
|---------|---------|------------|
| **DashboardPage** | `libs/features/dashboard` | `orders/core`, `users/core`, `catalog/core`, `shared/i18n` |
| **CheckoutPage** | `libs/features/checkout-flow` | `orders/core`, `catalog/core`, `shared/i18n` |
| **OnboardingPage** | `libs/features/user-onboarding` | `users/core`, `catalog/core` |

Tags: `domain:cross`, `type:feature`

---

## 7. Bibliotecas Shared (6)

| Library | Path | Exports | Finalidade |
|---------|------|---------|-----------|
| **shared-interfaces** | `libs/shared/interfaces` | `ApiResult<T>`, `AuditEntityType` | Contratos cross-cutting |
| **shared-store** | `libs/shared/store` | `createStore<T>(initial)` | Factory de store reativo (signal-based) |
| **shared-ui** | `libs/shared/ui` | `Button`, `Input`, `Modal` | Componentes UI reutilizaveis |
| **shared-i18n** | `libs/shared/i18n` | `t(key)` | Internacionalizacao simples com dicionario |
| **shared-util-auth** | `libs/shared/util-auth` | `setAuthToken()`, `getAuthToken()` | Token localStorage helper |
| **shared-util-http** | `libs/shared/util-http` | `buildApiUrl(base, path)` | Normalizacao de URLs |

Tags: `domain:shared`, `type:util` ou `type:ui` ou `type:infra`

---

## 8. Rotas da Aplicacao

| Rota | Componente | Biblioteca Fonte |
|------|-----------|------------------|
| `/` | `Home` | `shell` (local) |
| `/orders/list` | `OrderList` | `@my-workspace/orders/features/order-list` |
| `/orders/checkout` | `Checkout` | `@my-workspace/orders/features/checkout` |
| `/users/auth` | `Login` | `@my-workspace/users/features/auth` |
| `/users/profile` | `Profile` | `@my-workspace/users/features/profile` |
| `/catalog/browse` | `Browse` | `@my-workspace/catalog/features/browse` |
| `/catalog/detail/:id` | `Detail` | `@my-workspace/catalog/features/detail` |
| `/country-strategy` | redirect -> `list` | — |
| `/country-strategy/list` | `CountryStrategyList` | `@my-workspace/country-strategy/features/list` |
| `/country-strategy/detail/:id` | `CountryStrategyDetail` | `@my-workspace/country-strategy/features/detail` |
| `/dashboard` | `DashboardPage` | `@my-workspace/features/dashboard` |
| `/checkout-flow` | `CheckoutPage` | `@my-workspace/features/checkout-flow` |
| `/onboarding` | `OnboardingPage` | `@my-workspace/features/user-onboarding` |
| `/audit/:entityType/:entityId` | `AuditPage` | `@my-workspace/audit/features/audit-page` |

Todas as rotas usam **lazy loading** via `loadComponent` para otimizar o bundle inicial.

---

## 9. Module Boundary Rules (Regras de Fronteira)

O ESLint com `@nx/enforce-module-boundaries` garante que dependencias entre dominios respeitem as seguintes regras:

### Por Dominio (`domain:*`)

| Source Tag | Pode depender de |
|-----------|------------------|
| `domain:orders` | `domain:orders`, `domain:shared` |
| `domain:users` | `domain:users`, `domain:shared` |
| `domain:catalog` | `domain:catalog`, `domain:shared` |
| `domain:audit` | `domain:audit`, `domain:shared` |
| `domain:country-strategy` | `domain:country-strategy`, `domain:shared` |
| `domain:shared` | `domain:shared` (somente) |
| `domain:cross` | Todos os dominios |

### Por Tipo (`type:*`)

| Source Tag | Pode depender de |
|-----------|------------------|
| `type:feature` | `type:feature`, `type:core`, `type:domain`, `type:ui`, `type:util`, todos os `domain:*` |
| `type:core` | `type:core`, `type:util`, `domain:shared` |
| `type:ui` | `type:core`, `type:ui`, `type:util`, `domain:shared` |
| `type:util` | `type:util`, `domain:shared` |
| `type:infra` | Todos os tipos e dominios |
| `npm:public` | Sem restricoes (`*`) |

Isso impede, por exemplo, que `orders` importe diretamente de `users` — forcando o desacoplamento entre dominios.

---

## 10. Grafo de Dependencias entre Libraries

```
                    ┌──────────────┐
                    │   shell      │  (npm:public, domain:cross, type:infra)
                    │  app.routes  │
                    └──────┬───────┘
                           │ lazy loads
            ┌──────────────┼──────────────────────────────┐
            │              │                              │
    ┌───────▼──────┐  ┌───▼────────┐  ┌─────────────────▼──────┐
    │   Dashboard  │  │ Checkout   │  │  User Onboarding       │
    │ (cross)      │  │  Flow      │  │  (cross)               │
    └──┬───┬───┬───┘  └──┬────┬───┘  └────┬──────────┬────────┘
       │   │   │         │    │            │          │
       │   │   │         │    │            │          │
  ┌────▼┐ ┌▼──┐ ┌──▼───┐ ┌▼──┐     ┌─────▼───┐  ┌──▼──────┐
  │Orders│ │Users│ │Catalog│ │i18n│     │  Users  │  │ Catalog │
  │ core │ │core│ │ core │ │   │     │  core   │  │  core   │
  └──────┘ └────┘ └──────┘ └───┘     └─────────┘  └─────────┘

  ┌────────────┐    ┌──────────────────┐
  │   Audit    │───▶│ shared/interfaces│
  │  (domain)  │    │ (ApiResult, etc) │
  └────────────┘    └──────────────────┘

  ┌──────────────────┐    ┌──────────────────┐
  │ Country Strategy  │───▶│ shared/interfaces│
  │    (domain)       │    │                  │
  └──────────────────┘    └──────────────────┘
```

---

## 11. Estrategia de Estado (State Management)

- **Signal-based stores**: Cada dominio tem seu proprio `*Store` usando `signal()` do Angular.
- **`createStore<T>()`**: Factory compartilhada em `shared/store` que encapsula `signal()`.
- **`@ngrx/signals`**: Disponivel como dependencia para stores mais complexos.
- **`@ngrx/store`**: Disponivel para cenarios que exijam Redux-style global state.
- **Padrao API -> Service -> Store**: O `Service` chama o `Api`, atualiza o `Store`, e os componentes consomem o `Store` reativamente.

---

## 12. Camada de Dados (API Layer)

Nesta POC, **nao ha backend real**. Cada dominio possui uma classe `*Api` com dados **in-memory**:

- `OrdersApi` — array local de pedidos, CRUD simulado
- `CatalogApi` — array de produtos, busca por ID
- `AuditApi` — historico seedado com versionamento (etag), simulacao de conflito
- `CountryStrategyApi` — estrategias por pais com cache de 30s

O `shared/util-http` fornece `buildApiUrl()` como preparacao para integracao futura com backend real (SQL Server / Azure SQL mencionado no README).

---

## 13. Testes

### Testes Unitarios (Vitest)

- **Runner:** Vitest com preset `vitest-angular`
- **Executor Nx:** `@angular/build:unit-test` (shell), `@nx/angular:unit-test` (libs)
- **Cobertura de specs encontrados:**
  - Shell: `app.spec.ts`, `home.spec.ts`
  - Services: `orders`, `catalog`, `auth`, `audit`
  - Features: `order-list`, `checkout`, `login`, `browse`, `country-strategy-*`, `audit-page`, `dashboard`, `checkout-flow`, `onboarding`
  - Validators: `order-validators.spec.ts`
  - UI: `order-status-badge.spec.ts`

### Testes E2E (Playwright)

- **Arquivo:** `shell-e2e/src/example.spec.ts`
- **Cenarios:**
  - Home carrega com titulo "Nx Modular Monolith POC"
  - Login -> navegacao para dashboard
  - Catalog browse e detail
  - Orders list e checkout
- **Servidor:** `npx nx run shell:serve` (reutiliza servidor existente)

---

## 14. Comandos Operacionais

```bash
# Instalacao
npm install

# Servir a aplicacao
npx nx serve shell

# Lint de todos os projetos
npx nx run-many -t lint --all

# Testes unitarios de todos os projetos
npx nx run-many -t test --all

# Testes E2E
npx nx e2e shell-e2e --excludeTaskDependencies

# Grafo de dependencias visual
npx nx graph

# Exportar grafo como HTML
npx nx graph --file=./nx-graph.html
```

---

## 15. Nx Tags e Classificacao dos Projetos

| Projeto | domain | type |
|---------|--------|------|
| shell | `cross` | `infra` |
| orders | `orders` | `domain` |
| users | `users` | `domain` |
| catalog | `catalog` | `domain` |
| audit | `audit` | `domain` |
| country-strategy | `country-strategy` | `domain` |
| features-dashboard | `cross` | `feature` |
| features-checkout-flow | `cross` | `feature` |
| features-user-onboarding | `cross` | `feature` |
| shared-interfaces | `shared` | `util` |
| shared-store | `shared` | `infra` |
| shared-ui | `shared` | `ui` |
| shared-i18n | `shared` | `util` |
| shared-util-auth | `shared` | `util` |
| shared-util-http | `shared` | `util` |

---

## 16. O Que Esta Fora Deste Repositorio

Conforme documentado no README, os seguintes itens sao **externos** e nao estao neste workspace:

- Backend / API server (artefatos publicados separadamente)
- Containers de infraestrutura local (Docker compose)
- SQL Server / Azure SQL (conectividade e credenciais)
- Migrations de banco de dados (scripts de migracao)
- Pipeline de CI/CD (nao commitado; pode ser gerado com `npx nx g ci-workflow`)
- Nx Cloud (pode ser conectado com `npx nx connect`)

---

## 17. Decisoes Arquiteturais Chave

1. **Standalone Components**: Toda a aplicacao usa componentes standalone do Angular 21 (sem NgModules).

2. **Lazy Loading por Feature**: Cada feature e um entry point separado no `tsconfig.base.json`, permitindo code-splitting granular.

3. **Domain Isolation via Tags**: As regras de `@nx/enforce-module-boundaries` impedem dependencias ilegais entre dominios em tempo de lint.

4. **Dual-axis tagging**: Projetos sao tagueados em dois eixos — `domain:*` (escopo de negocio) e `type:*` (camada tecnica) — permitindo regras de dependencia sofisticadas.

5. **In-Memory APIs**: POC deliberadamente nao conecta a backend real para focar na demonstracao da arquitetura frontend.

6. **Signal-based Reactivity**: Uso de Angular Signals como primitiva de estado reativo ao inves de RxJS puro para stores.

7. **Audit com Optimistic Concurrency**: O dominio Audit demonstra versionamento com etag e tratamento de conflitos (HTTP 412 simulado).

---

## 18. Numeros do Projeto

| Metrica | Quantidade |
|---------|-----------|
| Projetos Nx | 16 (1 app + 1 e2e + 14 libs) |
| Dominios de negocio | 5 (orders, users, catalog, audit, country-strategy) |
| Features cross-domain | 3 (dashboard, checkout-flow, onboarding) |
| Shared libraries | 6 |
| Rotas lazy-loaded | 14 |
| Arquivos de spec (testes) | ~20+ |
| Regras de boundary (ESLint) | 11 constraints |

---

## 19. Como Rodar a Demo

```bash
# 1. Clone e instale
cd my-workspace
npm install

# 2. Sirva a aplicacao
npx nx serve shell

# 3. Abra no browser
# http://localhost:4200

# 4. Navegue pelas features:
#    - Home (hub de navegacao)
#    - /orders/list e /orders/checkout
#    - /catalog/browse e /catalog/detail/prd-100
#    - /users/auth e /users/profile
#    - /country-strategy/list e /country-strategy/detail/64
#    - /audit/country-strategy/64 (demonstracao de auditoria)
#    - /dashboard, /checkout-flow, /onboarding

# 5. Rode os testes
npx nx run-many -t test --all
npx nx run-many -t lint --all

# 6. Visualize o grafo de dependencias
npx nx graph
```
