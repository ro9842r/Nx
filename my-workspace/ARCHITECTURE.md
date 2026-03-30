# az-swa-oper-strategy -- Architecture Reference

> Angular 21 | NX 22.6 | NgRx Signal Store | TypeScript 5.9 | Tailwind CSS 3.4
>
> Generated: March 2026

---

## 1. What was done

The workspace was restructured from a multi-domain demo monorepo (`@my-workspace/*`) into a **domain-driven, boundary-enforced** NX workspace (`@oper/*`) aligned with the architecture proposal document.

### Removals

| Removed                     | Reason                                           |
| --------------------------- | ------------------------------------------------ |
| `libs/audit/`               | Domain not in proposal                           |
| `libs/catalog/`             | Domain not in proposal                           |
| `libs/users/`               | Domain not in proposal                           |
| `libs/orders/`              | Domain not in proposal                           |
| `libs/features/`            | dashboard, checkout-flow, user-onboarding removed|
| `libs/shared/ui/`           | Shared UI lives in scope libs, not globally      |
| `libs/shared/store/`        | Stores are per-scope (NgRx Signal Store)         |
| `libs/shared/i18n/`         | Not in proposal                                  |
| `shell-e2e/`                | Will recreate when needed                        |

### Renames and restructures

| Before                              | After                                                             |
| ----------------------------------- | ----------------------------------------------------------------- |
| `libs/shared/`                      | `libs/_shared/` (types, utils, constants only)                    |
| `libs/country-strategy-management/` | `libs/country-strategy-mgmt/` (grouping folder, no project.json) |
| 1 monolithic CS lib                 | 4 independent scope libs (`cs`, `cs-cen`, `rm`, `cs-members`)    |
| 1 monolithic PS lib                 | 2 independent scope libs (`cpd`, `ps-cen`)                       |
| `@my-workspace/*` path aliases      | `@oper/*` path aliases                                           |
| `@my-workspace/source` package name | `az-swa-oper-strategy`                                           |

### New creations

| Library        | Path                                              | Description                                   |
| -------------- | ------------------------------------------------- | --------------------------------------------- |
| `cs-members`   | `libs/country-strategy-mgmt/members/`             | Members sub-module scoped to csmgmt group      |
| Form schemas   | `use-cases/create/create.schema.ts`, `edit/edit.schema.ts` | Typed FormGroup definitions per use-case |
| `state/` layer | Inside each scope lib                             | NgRx Signal Store separated from data-access   |
| Shared utils   | `_shared/utils/src/lib/`                          | 8 utility files (date, localization, status, pagination, form, role, http-error, string) |
| Shared constants | `_shared/constants/src/lib/`                    | 3 files (status, roles, pagination)            |
| Shared types   | `_shared/types/src/lib/`                          | 3 files (base-response, pagination, master-data) |

### Config changes

- **`tsconfig.base.json`** -- All path aliases switched from `@my-workspace/*` to `@oper/*`
- **`eslint.config.mjs`** -- Boundary rules rewritten with `scope:csmgmt`, `scope:ps`, `scope:shared`, `type:app`, `type:feature`, `type:types`
- **`package.json`** -- Package renamed to `az-swa-oper-strategy`
- **`shell/project.json`** -- Tags simplified to `["type:app"]`
- **`app.routes.ts`** -- Only home + `country-strategy` routes remain, lazy-loaded via `@oper/cs`

---

## 2. Stack

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | Angular ~21.2                     |
| Monorepo tooling | NX 22.6                           |
| State management | @ngrx/signals ^21.1 (Signal Store)|
| Language         | TypeScript ~5.9                   |
| Styling          | Tailwind CSS ^3.4, SCSS           |
| Testing          | Vitest ^4.0, Playwright ^1.36    |
| Linting          | ESLint ^10 + @nx/eslint-plugin    |
| Bundler          | @angular/build (esbuild)          |
| Library bundler  | ng-packagr ~21.2                  |

---

## 3. NX Projects (10 total)

```
npx nx show projects
```

| NX Project        | Alias               | Type        | Tags                          |
| ----------------- | ------------------- | ----------- | ----------------------------- |
| `shell`           | --                  | application | `type:app`                    |
| `shared-types`    | `@oper/shared-types`| library     | `type:types`, `scope:shared`  |
| `shared-utils`    | `@oper/shared-utils`| library     | `scope:shared`                |
| `shared-constants`| `@oper/shared-constants`| library | `scope:shared`                |
| `cs`              | `@oper/cs`          | library     | `type:feature`, `scope:csmgmt`|
| `cs-cen`          | `@oper/cs-cen`      | library     | `type:feature`, `scope:csmgmt`|
| `rm`              | `@oper/rm`          | library     | `type:feature`, `scope:csmgmt`|
| `cs-members`      | `@oper/cs-members`  | library     | `type:feature`, `scope:csmgmt`|
| `cpd`             | `@oper/cpd`         | library     | `type:feature`, `scope:ps`    |
| `ps-cen`          | `@oper/ps-cen`      | library     | `type:feature`, `scope:ps`    |

---

## 4. Path Aliases (`tsconfig.base.json`)

```
@oper/shared-types      -->  libs/_shared/types/src/index.ts
@oper/shared-utils      -->  libs/_shared/utils/src/index.ts
@oper/shared-constants  -->  libs/_shared/constants/src/index.ts
@oper/cs-members        -->  libs/country-strategy-mgmt/members/src/index.ts
@oper/cs                -->  libs/country-strategy-mgmt/features/country-strategies/src/index.ts
@oper/cs-cen            -->  libs/country-strategy-mgmt/features/country-engagement-note/src/index.ts
@oper/rm                -->  libs/country-strategy-mgmt/features/result-matrix/src/index.ts
@oper/cpd               -->  libs/portfolio-supervision/features/cpd/src/index.ts
@oper/ps-cen            -->  libs/portfolio-supervision/features/country-engagement-note/src/index.ts
```

---

## 5. Dependency Rules (ESLint module boundaries)

```
shell (type:app)
  |
  +--> feature scopes (type:feature)  +  shared (scope:shared)
         |
         +--> scope:shared only
```

| Source Tag     | Can depend on                              |
| -------------- | ------------------------------------------ |
| `type:app`     | `type:feature`, `scope:shared`, `scope:csmgmt`, `scope:ps` |
| `type:feature` | `type:feature`, `scope:shared`             |
| `scope:csmgmt` | `scope:csmgmt`, `scope:shared`             |
| `scope:ps`     | `scope:ps`, `scope:shared`                 |
| `scope:shared` | `scope:shared`                             |
| `type:types`   | nothing                                    |

**Forbidden paths:** `shared` cannot import scopes. `scope:ps` cannot import `scope:csmgmt`. `type:types` has zero dependencies.

---

## 6. Complete Workspace File Tree

```
az-swa-oper-strategy/                          # NX workspace root
|-- nx.json                                     # NX config, targetDefaults, plugins
|-- package.json                                # name: az-swa-oper-strategy
|-- tsconfig.base.json                          # @oper/* path aliases
|-- eslint.config.mjs                           # enforce-module-boundaries
|
|-- shell/                                      # Angular application (thin container)
|   |-- project.json                            # name: shell, tags: [type:app]
|   |-- tsconfig.json
|   |-- tsconfig.app.json
|   |-- tsconfig.spec.json
|   |-- tailwind.config.js
|   |-- eslint.config.mjs
|   |-- public/
|   |   +-- favicon.ico
|   +-- src/
|       |-- index.html
|       |-- main.ts
|       |-- styles.scss
|       +-- app/
|           |-- app.ts                          # root component
|           |-- app.html
|           |-- app.scss
|           |-- app.spec.ts
|           |-- app.config.ts                   # bootstrap config
|           |-- app.routes.ts                   # lazy routes via @oper/cs
|           |-- home.ts                         # landing page component
|           |-- home.html
|           |-- home.scss
|           |-- home.spec.ts
|           +-- nx-welcome.ts
|
+-- libs/
    |
    |-- _shared/                                # cross-domain code only
    |   |
    |   |-- types/                              # @oper/shared-types
    |   |   |-- project.json                    # [type:types, scope:shared]
    |   |   |-- ng-package.json
    |   |   |-- tsconfig.json
    |   |   |-- tsconfig.lib.json
    |   |   |-- tsconfig.spec.json
    |   |   +-- src/
    |   |       |-- index.ts
    |   |       +-- lib/
    |   |           |-- base-response.model.ts  # ApiResult<T>
    |   |           |-- pagination.model.ts     # PaginatedResult, PageParams
    |   |           +-- master-data.model.ts    # MasterDataItem, AuditEntityType
    |   |
    |   |-- utils/                              # @oper/shared-utils
    |   |   |-- project.json                    # [scope:shared]
    |   |   |-- ng-package.json
    |   |   |-- tsconfig.json
    |   |   |-- tsconfig.lib.json
    |   |   |-- tsconfig.spec.json
    |   |   +-- src/
    |   |       |-- index.ts
    |   |       +-- lib/
    |   |           |-- date.utils.ts           # formatDate, parseISODate, getYearRange
    |   |           |-- localization.utils.ts   # getLocalizedName
    |   |           |-- status.utils.ts         # getStatusClass, getStatusLabel
    |   |           |-- pagination.utils.ts     # buildPageParams, calcTotalPages
    |   |           |-- form.utils.ts           # getControlError, markAllAsTouched, resetFormSafely
    |   |           |-- role.utils.ts           # getRoleNameFromCode, sortMembersTeamLeadFirst
    |   |           |-- http-error.utils.ts     # extractApiError, isConflictError, mapHttpErrorToMessage
    |   |           +-- string.utils.ts         # capitalize, truncate, slugify
    |   |
    |   +-- constants/                          # @oper/shared-constants
    |       |-- project.json                    # [scope:shared]
    |       |-- ng-package.json
    |       |-- tsconfig.json
    |       |-- tsconfig.lib.json
    |       |-- tsconfig.spec.json
    |       +-- src/
    |           |-- index.ts
    |           +-- lib/
    |               |-- status.constants.ts     # STATUS_DRAFT, STATUS_ACTIVE, STATUS_CLOSED
    |               |-- roles.constants.ts      # ROLE_TEAM_LEAD, ROLE_PROGRAMME_MANAGER, ROLE_MEMBER
    |               +-- pagination.constants.ts # DEFAULT_PAGE_SIZE, DEFAULT_CACHE_TTL_MS, MAX_PAGE_SIZE
    |
    |-- country-strategy-mgmt/                  # module group (no project.json)
    |   |
    |   |-- members/                            # @oper/cs-members
    |   |   |-- project.json                    # [type:feature, scope:csmgmt]
    |   |   |-- ng-package.json
    |   |   |-- tsconfig.json
    |   |   |-- tsconfig.lib.json
    |   |   |-- tsconfig.spec.json
    |   |   +-- src/
    |   |       |-- index.ts
    |   |       |-- types/
    |   |       |   |-- index.ts
    |   |       |   |-- member.model.ts         # Member interface
    |   |       |   +-- role.model.ts           # Role interface
    |   |       |-- data-access/
    |   |       |   |-- index.ts
    |   |       |   +-- members.service.ts      # MembersService (HTTP)
    |   |       |-- state/
    |   |       |   |-- index.ts
    |   |       |   +-- members.store.ts        # MembersStore (NgRx Signal Store)
    |   |       +-- ui/
    |   |           |-- index.ts
    |   |           |-- members-panel.component.ts
    |   |           +-- member-card.component.ts
    |   |
    |   +-- features/
    |       |
    |       |-- country-strategies/             # @oper/cs (existing -- migrated)
    |       |   |-- project.json                # [type:feature, scope:csmgmt]
    |       |   |-- ng-package.json
    |       |   |-- tsconfig.json
    |       |   |-- tsconfig.lib.json
    |       |   |-- tsconfig.spec.json
    |       |   +-- src/
    |       |       |-- index.ts                # public barrel
    |       |       |-- types/
    |       |       |   |-- index.ts
    |       |       |   +-- country-strategy.model.ts
    |       |       |-- data-access/
    |       |       |   |-- index.ts
    |       |       |   |-- country-strategy.api.ts
    |       |       |   +-- country-strategy.service.ts
    |       |       |-- state/
    |       |       |   +-- country-strategy.store.ts  # NgRx Signal Store
    |       |       |-- use-cases/
    |       |       |   |-- index.ts
    |       |       |   |-- create/
    |       |       |   |   |-- index.ts
    |       |       |   |   +-- create.schema.ts       # typed FormGroup
    |       |       |   |-- edit/
    |       |       |   |   |-- index.ts
    |       |       |   |   +-- edit.schema.ts         # typed FormGroup
    |       |       |   +-- list/
    |       |       |       +-- index.ts
    |       |       |-- list/                           # page component
    |       |       |   |-- index.ts
    |       |       |   |-- country-strategy-list.ts
    |       |       |   |-- country-strategy-list.html
    |       |       |   |-- country-strategy-list.scss
    |       |       |   +-- country-strategy-list.spec.ts
    |       |       |-- detail/                         # page component
    |       |       |   |-- index.ts
    |       |       |   |-- country-strategy-detail.ts
    |       |       |   |-- country-strategy-detail.html
    |       |       |   |-- country-strategy-detail.scss
    |       |       |   +-- country-strategy-detail.spec.ts
    |       |       +-- create/                         # page component
    |       |           |-- index.ts
    |       |           +-- country-strategy-create.ts
    |       |
    |       |-- country-engagement-note/        # @oper/cs-cen (future -- Phase 4)
    |       |   |-- project.json                # [type:feature, scope:csmgmt]
    |       |   |-- ng-package.json
    |       |   |-- tsconfig.json
    |       |   |-- tsconfig.lib.json
    |       |   |-- tsconfig.spec.json
    |       |   +-- src/
    |       |       |-- index.ts
    |       |       |-- types/
    |       |       |   |-- index.ts
    |       |       |   +-- country-engagement-note.model.ts
    |       |       |-- data-access/
    |       |       |   +-- index.ts            # stub
    |       |       |-- state/
    |       |       |   +-- index.ts            # stub
    |       |       +-- use-cases/
    |       |           |-- index.ts
    |       |           |-- create/
    |       |           |   |-- index.ts
    |       |           |   +-- engagement-note-create.ts
    |       |           |-- edit/
    |       |           |   |-- index.ts
    |       |           |   +-- engagement-note-edit.ts
    |       |           +-- list/
    |       |               |-- index.ts
    |       |               +-- engagement-note-list.ts
    |       |
    |       +-- result-matrix/                  # @oper/rm (future -- Phase 4)
    |           |-- project.json                # [type:feature, scope:csmgmt]
    |           |-- ng-package.json
    |           |-- tsconfig.json
    |           |-- tsconfig.lib.json
    |           |-- tsconfig.spec.json
    |           +-- src/
    |               |-- index.ts
    |               |-- types/
    |               |   |-- index.ts
    |               |   +-- result-matrix.model.ts
    |               |-- data-access/
    |               |   +-- index.ts            # stub
    |               |-- state/
    |               |   +-- index.ts            # stub
    |               +-- use-cases/
    |                   +-- index.ts            # stub
    |
    +-- portfolio-supervision/                  # module group (no project.json)
        |
        +-- features/
            |
            |-- cpd/                            # @oper/cpd (future -- Phase 4)
            |   |-- project.json                # [type:feature, scope:ps]
            |   |-- ng-package.json
            |   |-- tsconfig.json
            |   |-- tsconfig.lib.json
            |   |-- tsconfig.spec.json
            |   +-- src/
            |       |-- index.ts
            |       |-- types/
            |       |   |-- index.ts
            |       |   +-- cpd.model.ts
            |       |-- data-access/
            |       |   +-- index.ts            # stub
            |       |-- state/
            |       |   +-- index.ts            # stub
            |       +-- use-cases/
            |           |-- index.ts
            |           |-- create/
            |           |   |-- index.ts
            |           |   +-- cpd-create.ts
            |           |-- edit/
            |           |   |-- index.ts
            |           |   +-- cpd-edit.ts
            |           +-- list/
            |               |-- index.ts
            |               +-- cpd-list.ts
            |
            +-- country-engagement-note/        # @oper/ps-cen (future -- Phase 4)
                |-- project.json                # [type:feature, scope:ps]
                |-- ng-package.json
                |-- tsconfig.json
                |-- tsconfig.lib.json
                |-- tsconfig.spec.json
                +-- src/
                    |-- index.ts
                    |-- types/
                    |   |-- index.ts
                    |   +-- country-engagement-note.model.ts
                    |-- data-access/
                    |   +-- index.ts            # stub
                    |-- state/
                    |   +-- index.ts            # stub
                    +-- use-cases/
                        |-- index.ts
                        |-- create/
                        |   |-- index.ts
                        |   +-- ps-engagement-note-create.ts
                        |-- edit/
                        |   |-- index.ts
                        |   +-- ps-engagement-note-edit.ts
                        +-- list/
                            |-- index.ts
                            +-- ps-engagement-note-list.ts
```

---

## 7. Internal Layer Convention (per scope lib)

Every scope lib follows the same internal structure:

```
<scope-lib>/
  src/
    types/          Models, interfaces, enums. Exported via barrel.
    data-access/    HTTP services (API calls only). No state.
    state/          NgRx Signal Store. Consumes data-access.
    use-cases/      Form schemas (.schema.ts), business logic. Internal, not exported.
    list/           Page component for list view.
    create/         Page component for create view.
    detail/         Page component for detail view.
    index.ts        Public API barrel -- only exports what consumers need.
```

---

## 8. NgRx Signal Store Pattern

All domains use `@ngrx/signals` Signal Store. No separate actions/reducers/effects files.

**Store definition** (`state/` folder):

```typescript
export class CountryStrategyStore {
  private readonly state = signalState<CountryStrategyState>({
    strategies: [],
    selected: null,
    loadedAt: null,
    isStale: true,
  });

  readonly strategies = computed(() => this.state.strategies());
  readonly selected   = computed(() => this.state.selected());

  setStrategies(strategies: CountryStrategySummary[]): void {
    patchState(this.state, { strategies, loadedAt: Date.now(), isStale: false });
  }
}
```

**Consumption in component**:

```typescript
export class ListComponent {
  readonly store = inject(CountryStrategyService).store;
  // template uses: store.strategies(), store.selected()
}
```

---

## 9. Typed Form Schema Pattern

Each `use-cases/create/` and `use-cases/edit/` folder contains a `.schema.ts` file -- single source of truth for form shape, validators, and defaults.

```typescript
// use-cases/create/create.schema.ts
export type CreateStrategyForm = FormGroup<{
  countryCode: FormControl<string>;
  startYear:   FormControl<number | null>;
  endYear:     FormControl<number | null>;
}>;

export function buildCreateStrategyForm(fb: FormBuilder): CreateStrategyForm {
  return fb.group({
    countryCode: fb.control('', { nonNullable: true, validators: [Validators.required] }),
    startYear:   fb.control<number | null>(null, [Validators.required]),
    endYear:     fb.control<number | null>(null, [Validators.required]),
  });
}
```

---

## 10. Shell Routing

The shell app is a thin deployment container. All business logic lives in libs.

```typescript
// shell/src/app/app.routes.ts
export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./home').then((m) => m.Home),
  },
  {
    path: 'country-strategy',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        loadComponent: () => import('@oper/cs').then((m) => m.CountryStrategyList),
      },
      {
        path: 'detail/:id',
        loadComponent: () => import('@oper/cs').then((m) => m.CountryStrategyDetail),
      },
      {
        path: 'create',
        loadComponent: () => import('@oper/cs').then((m) => m.CountryStrategyCreate),
      },
    ],
  },
];
```

---

## 11. Key NX Commands

```bash
# Serve the application
npx nx serve shell

# Build for production
npx nx build shell --configuration=production

# Lint a specific lib
npx nx lint cs

# Test a specific lib
npx nx test cs-members

# Run affected tests on PRs
npx nx affected -t test

# Show the project graph
npx nx graph

# List all projects
npx nx show projects

# Reset daemon cache
npx nx reset
```

---

## 12. Next Steps (from proposal)

| Phase | Scope                                  | Status       |
| ----- | -------------------------------------- | ------------ |
| 0     | Team decision gates                    | Pending      |
| 1     | NX workspace initialization            | **Done**     |
| 2     | Shared foundation libraries            | **Done**     |
| 3     | Members sub-module + CS migration      | **Done**     |
| 4     | Scaffold cs-cen, rm, cpd, ps-cen      | **Scaffolded** (stubs ready) |
| 5     | CI/CD affected commands + team ADR     | Pending      |
