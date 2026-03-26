# Tasks Tecnicas Detalhadas - POC Nx Modular Monolith

## Execucao oficial (projeto do zero)

Para execucao do zero em formato **1 task por MD**, use:

- `docs/poc-rebuild/task-files/README.md`

Os arquivos `task-01` ate `task-38` sao o roteiro operacional principal.

## Status apos backlog de ajustes

- [x] B01 Remover bypass de boundaries no `shell/src/app/app.routes.ts`.
- [x] B02 Registrar evidencia de bloqueio de import invalido por `@nx/enforce-module-boundaries`.
- [x] B03 Alinhar docs com estrutura real (`shell/`, `shell-e2e/`, `libs/`).
- [x] B04 Refinar constraints (`type:util` explicito e `type:infra` mais restrito).
- [x] B05 Completar E2E: `login -> dashboard`, `browse -> detail`, `order list -> checkout`.
- [x] B06 Aplicar fase minima de cache com NgRx Signals + invalidacao em `orders`.
- [x] B07 Consolidar evidencias finais no relatorio (secao 13 atualizada com comandos e resultados).
- [x] B08 Rodar quality gate completo e fechar pendencias.

## Adendo de convencao (pos-call)

- Aplicar principio de "projeto Nx somente quando necessario" para reduzir boilerplate repetido em subpastas.
- Manter organizacao por dominio e feature como prioridade; evitar criar projeto Nx para cada pasta interna sem necessidade de ciclo independente.
- Quando houver requisito transversal de auditoria, concentrar em modulo dedicado (`domain:audit`) e evitar acoplamento de regra de negocio em `shared`.
- Nomenclatura oficial da camada de dominio: `core` (substitui `data-access`) com tag `type:core`.

## 1) Checklist Sequencial de Execucao (1-2h por task)

Este e o modo oficial de execucao desta POC. Execute estritamente de `S01` ate `S24`, sem pular etapas.

Formato de cada item:

- `Task ID`
- objetivo curto
- duracao estimada (1-2h)
- pre-requisito imediato
- passos objetivos
- comando de validacao
- criterio de aceite
- saida esperada (artefato)

### S01 - Baseline do workspace

- **Duracao:** 1h
- **Pre-requisito:** nenhum
- **Passos:** validar estrutura raiz (`shell/`, `shell-e2e/`, `libs/`, configs Nx/TS/ESLint), mapear projetos atuais.
- **Validacao:** `nx show projects`
- **Aceite:** inventario inicial registrado.
- **Saida esperada:** lista de projetos e lacunas.

### S02 - Padrao de naming e convencoes

- **Duracao:** 1h
- **Pre-requisito:** S01
- **Passos:** fixar padroes de nomes para dominios, subcamadas, features e exports publicos.
- **Validacao:** revisao estrutural + `nx show projects`
- **Aceite:** sem ambiguidades de naming.
- **Saida esperada:** convencoes aplicadas no scaffold.

### S03 - Shell app (bootstrap standalone)

- **Duracao:** 1-2h
- **Pre-requisito:** S02
- **Passos:** revisar `main.ts`, `app.config.ts`, `app.routes.ts`; manter shell sem regra de negocio.
- **Validacao:** `nx serve shell`
- **Aceite:** shell sobe e navega.
- **Saida esperada:** app host funcional.

### S04 - Criar dominio `orders` (estrutura base)

- **Duracao:** 1-2h
- **Pre-requisito:** S03
- **Passos:** criar `core`, `ui-components`, `util-validators`, `features` com `project.json`, `index.ts` e `src/lib`.
- **Validacao:** `nx show project <orders-project>`
- **Aceite:** topologia completa do dominio.
- **Saida esperada:** arvore `libs/orders/**`.

### S05 - Criar dominio `users` (estrutura base)

- **Duracao:** 1-2h
- **Pre-requisito:** S04
- **Passos:** repetir padrao estrutural de `orders` para `users`.
- **Validacao:** `nx show project <users-project>`
- **Aceite:** topologia completa do dominio.
- **Saida esperada:** arvore `libs/users/**`.

### S06 - Criar dominio `catalog` (estrutura base)

- **Duracao:** 1-2h
- **Pre-requisito:** S05
- **Passos:** repetir padrao estrutural de `orders` para `catalog`.
- **Validacao:** `nx show project <catalog-project>`
- **Aceite:** topologia completa do dominio.
- **Saida esperada:** arvore `libs/catalog/**`.

### S07 - Orders core minimo

- **Duracao:** 1-2h
- **Pre-requisito:** S06
- **Passos:** criar `orders.service.ts`, `orders.store.ts`, `orders.api.ts`, `orders.models.ts`.
- **Validacao:** `nx lint orders-core`
- **Aceite:** compilacao e exports publicos corretos.
- **Saida esperada:** core de `orders` operacional.

### S08 - Users core minimo

- **Duracao:** 1-2h
- **Pre-requisito:** S07
- **Passos:** criar `auth.service.ts`, `auth.store.ts`, `user.models.ts`.
- **Validacao:** `nx lint users-core`
- **Aceite:** compilacao e exports publicos corretos.
- **Saida esperada:** core de `users` operacional.

### S09 - Catalog core minimo

- **Duracao:** 1-2h
- **Pre-requisito:** S08
- **Passos:** criar `catalog.service.ts`, `catalog.store.ts`, `catalog.api.ts`, `catalog.models.ts`.
- **Validacao:** `nx lint catalog-core`
- **Aceite:** compilacao e exports publicos corretos.
- **Saida esperada:** core de `catalog` operacional.

### S10 - Orders ui-components e validators

- **Duracao:** 1-2h
- **Pre-requisito:** S09
- **Passos:** criar `order-card`, `order-status-badge`, `order-validators`.
- **Validacao:** `nx lint orders-ui-components && nx lint orders-util-validators`
- **Aceite:** componentes standalone + validadores exportados.
- **Saida esperada:** camada de UI/util de `orders`.

### S11 - Users ui-components e validators

- **Duracao:** 1-2h
- **Pre-requisito:** S10
- **Passos:** criar `avatar`, `user-validators`.
- **Validacao:** `nx lint users-ui-components && nx lint users-util-validators`
- **Aceite:** componentes standalone + validadores exportados.
- **Saida esperada:** camada de UI/util de `users`.

### S12 - Catalog ui-components e validators

- **Duracao:** 1-2h
- **Pre-requisito:** S11
- **Passos:** criar `product-card`, `product-badge`, `catalog-validators`.
- **Validacao:** `nx lint catalog-ui-components && nx lint catalog-util-validators`
- **Aceite:** componentes standalone + validadores exportados.
- **Saida esperada:** camada de UI/util de `catalog`.

### S13 - Features de `orders`

- **Duracao:** 1-2h
- **Pre-requisito:** S12
- **Passos:** criar `feature-order-list` e `feature-checkout` com `routes`, `component.ts`, `component.html`.
- **Validacao:** `nx lint orders-feature-order-list && nx lint orders-feature-checkout`
- **Aceite:** features navegaveis e autocontidas.
- **Saida esperada:** vertical slices de `orders`.

### S14 - Features de `users`

- **Duracao:** 1-2h
- **Pre-requisito:** S13
- **Passos:** criar `feature-profile` e `feature-auth`.
- **Validacao:** `nx lint users-feature-profile && nx lint users-feature-auth`
- **Aceite:** features navegaveis e autocontidas.
- **Saida esperada:** vertical slices de `users`.

### S15 - Features de `catalog`

- **Duracao:** 1-2h
- **Pre-requisito:** S14
- **Passos:** criar `feature-browse` e `feature-detail`.
- **Validacao:** `nx lint catalog-feature-browse && nx lint catalog-feature-detail`
- **Aceite:** features navegaveis e autocontidas.
- **Saida esperada:** vertical slices de `catalog`.

### S16 - Integrar rotas de dominio no shell

- **Duracao:** 1h
- **Pre-requisito:** S15
- **Passos:** conectar lazy routes das features no `shell/src/app/app.routes.ts`.
- **Validacao:** `nx serve shell`
- **Aceite:** navegacao por dominios funcionando.
- **Saida esperada:** roteamento consolidado.

### S17 - Criar `libs/shared/*`

- **Duracao:** 1-2h
- **Pre-requisito:** S16
- **Passos:** criar `shared/ui`, `shared/util-http`, `shared/util-auth`, `shared/interfaces`, `shared/store`, `shared/i18n`.
- **Validacao:** `nx show projects`
- **Aceite:** shared existente e sem regra de negocio de dominio.
- **Saida esperada:** base transversal pronta.

### S18 - Criar `libs/features/*` cross-dominio

- **Duracao:** 1-2h
- **Pre-requisito:** S17
- **Passos:** criar `checkout-flow`, `dashboard`, `user-onboarding`.
- **Validacao:** `nx lint features-checkout-flow && nx lint features-dashboard && nx lint features-user-onboarding`
- **Aceite:** features cross orquestram sem vazar regra de dominio.
- **Saida esperada:** camada cross-dominio pronta.

### S19 - Aplicar tags Nx em todos os projetos

- **Duracao:** 1-2h
- **Pre-requisito:** S18
- **Passos:** adicionar tags de `domain:*` e `type:*` em shell/libs.
- **Validacao:** `nx show project <project-name>`
- **Aceite:** 100% dos projetos tagueados.
- **Saida esperada:** taxonomia Nx aplicada.

### S20 - Configurar constraints de dependencias

- **Duracao:** 1-2h
- **Pre-requisito:** S19
- **Passos:** configurar regras para bloquear imports invalidos entre dominios/tipos.
- **Validacao:** `nx lint`
- **Aceite:** lint bloqueia acoplamento invalido.
- **Saida esperada:** governance automatizada.

### S21 - Evidencia de boundaries

- **Duracao:** 1h
- **Pre-requisito:** S20
- **Passos:** executar `nx graph`; produzir evidencia de regra ativa (exemplo de violacao controlada + reversao).
- **Validacao:** `nx graph` + `nx lint`
- **Aceite:** prova objetiva de enforcement.
- **Saida esperada:** artefatos para demo tecnica.

### S22 - Testes unitarios minimos (baseline)

- **Duracao:** 1-2h
- **Pre-requisito:** S21
- **Passos:** adicionar testes para stores/services/validators criticos.
- **Validacao:** `nx run-many -t test --projects=<lista-projetos>`
- **Aceite:** suite minima verde.
- **Saida esperada:** baseline de unit tests.

### S23 - E2E minimo com Playwright

- **Duracao:** 1-2h
- **Pre-requisito:** S22
- **Passos:** criar smoke de login, browse/detail e order flow.
- **Validacao:** `nx e2e shell-e2e`
- **Aceite:** fluxos principais passando.
- **Saida esperada:** cobertura E2E minima.

### S24 - Gate final de prontidao para demo

- **Duracao:** 1h
- **Pre-requisito:** S23
- **Passos:** executar checklist final de arquitetura, qualidade e roteiro de pitch.
- **Validacao:** `nx run-many -t lint --all && nx graph --file=../docs/poc-rebuild/nx-graph.html && nx run-many -t test --all && nx e2e shell-e2e --excludeTaskDependencies`
- **Aceite:** POC pronta para apresentacao ao stakeholder.
- **Saida esperada:** pacote final de demo.

---

## 2) Tracking de execucao (marcar conforme avanco)

- [ ] S01 Baseline do workspace
- [ ] S02 Padrao de naming e convencoes
- [ ] S03 Shell app (bootstrap standalone)
- [ ] S04 Criar dominio `orders`
- [ ] S05 Criar dominio `users`
- [ ] S06 Criar dominio `catalog`
- [ ] S07 Orders core minimo
- [ ] S08 Users core minimo
- [ ] S09 Catalog core minimo
- [ ] S10 Orders ui-components e validators
- [ ] S11 Users ui-components e validators
- [ ] S12 Catalog ui-components e validators
- [ ] S13 Features de `orders`
- [ ] S14 Features de `users`
- [ ] S15 Features de `catalog`
- [ ] S16 Integrar rotas de dominio no shell
- [ ] S17 Criar `libs/shared/*`
- [ ] S18 Criar `libs/features/*` cross-dominio
- [ ] S19 Aplicar tags Nx em todos os projetos
- [ ] S20 Configurar constraints de dependencias
- [ ] S21 Evidencia de boundaries
- [ ] S22 Testes unitarios minimos (baseline)
- [ ] S23 E2E minimo com Playwright
- [ ] S24 Gate final de prontidao para demo

---

## 3) Referencia detalhada por fase (apoio)

As secoes abaixo permanecem como referencia detalhada por fase e aprofundamento tecnico.

## Fase 0 - Preparacao e baseline

### T0.1 - Definir naming conventions e estrutura base

**Objetivo:** padronizar nomes para evitar retrabalho.

**Escopo alvo:**

- `shell/`
- `shell-e2e/`
- `libs/`
- `nx.json`
- `tsconfig.base.json`

**Passos tecnicos:**

1. Confirmar convencao de nomes:
   - dominios: `orders`, `users`, `catalog`;
   - subcamadas: `core`, `ui-components`, `util-validators`, `features`;
   - features: `feature-*`.
2. Definir convencao de export publico (`src/index.ts`) para todas as libs.
3. Confirmar aliases e path mapping coerentes por biblioteca.

**Comandos de validacao:**

- `nx graph`
- `nx show projects`

**Criterio de aceite:**

- Padrao de naming unico, sem duplicidade semantica.

**DoD:**

- Documento de convencao validado internamente e aplicado no scaffold.

---

### T0.2 - Definir taxonomia de tags Nx

**Objetivo:** criar base para enforcement arquitetural.

**Escopo alvo:**

- `nx.json`
- `project.json` de cada lib/app

**Passos tecnicos:**

1. Definir tags de dominio:
   - `domain:orders`, `domain:users`, `domain:catalog`, `domain:cross`, `domain:shared`.
2. Definir tags de tipo:
   - `type:feature`, `type:core`, `type:ui`, `type:util`, `type:infra`.
3. Aplicar tags em todos os projetos criados.

**Comandos de validacao:**

- `nx show project <project-name>`

**Criterio de aceite:**

- 100% dos projetos com tags consistentes.

**DoD:**

- Nenhum projeto sem tag obrigatoria.

---

## Fase 1 - Scaffold do workspace e modulos

### T1.1 - Criar/ajustar aplicacao shell

**Objetivo:** manter app host de rotas/providers bootstrap.

**Escopo alvo:**

- `shell/src/main.ts`
- `shell/src/app/app.config.ts`
- `shell/src/app/app.routes.ts`

**Passos tecnicos:**

1. Garantir bootstrap da app com standalone.
2. Configurar roteamento principal lazy para features de dominio e cross-dominio.
3. Evitar logica de negocio dentro da app shell.

**Comandos de validacao:**

- `nx serve shell`

**Criterio de aceite:**

- App sobe e roteia sem acoplamento de regra de negocio.

**DoD:**

- Shell apenas orquestra composicao e navegacao.

---

### T1.2 - Scaffold dos dominios de negocio

**Objetivo:** estabelecer base de `orders`, `users`, `catalog` em `libs/`.

**Escopo alvo:**

- `libs/orders/**`
- `libs/users/**`
- `libs/catalog/**`

**Passos tecnicos:**

1. Criar para cada dominio:
   - `core`;
   - `ui-components`;
   - `util-validators`;
   - `features`.
2. Em cada lib, garantir:
   - `project.json`;
   - `src/index.ts`;
   - pasta `src/lib`.
3. Criar esqueletos minimos:
   - services/stores/apis/models no `core`;
   - componentes de apresentacao no `ui-components`;
   - validadores no `util-validators`.

**Comandos de validacao:**

- `nx show projects`
- `nx graph`

**Criterio de aceite:**

- Arvore de dominio aderente ao modelo esperado.

**DoD:**

- 3 dominios completos com subcamadas padrao.

---

### T1.3 - Scaffold de features por use-case

**Objetivo:** materializar vertical slices por caso de uso.

**Escopo alvo:**

- `libs/orders/features/feature-order-list/**`
- `libs/orders/features/feature-checkout/**`
- `libs/users/features/feature-profile/**`
- `libs/users/features/feature-auth/**`
- `libs/catalog/features/feature-browse/**`
- `libs/catalog/features/feature-detail/**`

**Passos tecnicos:**

1. Criar para cada feature:
   - `project.json`;
   - `src/index.ts`;
   - componente standalone;
   - arquivo de rotas da feature.
2. Centralizar na feature a orquestracao do caso de uso.
3. Consumir `core` e `ui-components` do mesmo dominio.

**Comandos de validacao:**

- `nx lint <feature-project>`
- `nx test <feature-project>` (se aplicavel)

**Criterio de aceite:**

- Cada use-case navegavel e autocontido.

**DoD:**

- 6 features minimas implementadas com rota e componente.

---

## Fase 2 - Boundary rules e validacao de dependencias

### T2.1 - Configurar constraints de dependencia

**Objetivo:** bloquear acoplamentos invalidos por regra automatica.

**Escopo alvo:**

- `.eslintrc.json` (ou config equivalente da regra Nx)
- `nx.json`

**Passos tecnicos:**

1. Definir constraints por tags (dominio + tipo).
2. Permitir dependencias somente na direcao arquitetural aprovada.
3. Bloquear:
   - feature -> feature de outro dominio sem contrato permitido;
   - ui -> feature;
   - shared recebendo regra de negocio de dominio.

**Comandos de validacao:**

- `nx lint`

**Criterio de aceite:**

- Lint impede imports fora da politica.

**DoD:**

- Regra ativa e comprovada.

---

### T2.2 - Prova de enforcement (teste arquitetural)

**Objetivo:** gerar evidencia para demo/stakeholder.

**Escopo alvo:**

- Regras de import
- Grafico Nx

**Passos tecnicos:**

1. Preparar exemplo controlado de import invalido (branch local ou commit temporario de teste).
2. Rodar lint e capturar erro esperado.
3. Reverter o exemplo invalido.
4. Capturar `nx graph` com estrutura final.

**Comandos de validacao:**

- `nx lint`
- `nx graph`

**Criterio de aceite:**

- Evidencia clara de que governanca esta automatizada.

**DoD:**

- Material pronto para ser mostrado na apresentacao.

---

## Fase 3 - Features verticais por dominio

### T3.1 - Orders vertical slice

**Objetivo:** entregar fluxo minimo de pedidos com separacao correta.

**Escopo alvo:**

- `libs/orders/core/**`
- `libs/orders/ui-components/**`
- `libs/orders/features/**`

**Passos tecnicos:**

1. Implementar store e facade/service no `core`.
2. Implementar componentes de visualizacao no `ui-components`.
3. Implementar `feature-order-list` e `feature-checkout` conectadas ao core.

**Comandos de validacao:**

- `nx lint orders-core`
- `nx lint orders-ui-components`
- `nx lint orders-feature-order-list`

**Criterio de aceite:**

- Fluxos minimos de listagem e checkout funcionando no shell.

**DoD:**

- Orders pronto para demo de modularidade.

---

### T3.2 - Users vertical slice

**Objetivo:** autenticao/perfil organizados por use-case.

**Escopo alvo:**

- `libs/users/core/**`
- `libs/users/ui-components/**`
- `libs/users/features/**`

**Passos tecnicos:**

1. Implementar `auth.service`, `auth.store`, `user.models`.
2. Implementar feature de login e profile.
3. Integrar rotas no shell sem vazar regra para app host.

**Comandos de validacao:**

- `nx lint users-core`
- `nx lint users-feature-auth`
- `nx lint users-feature-profile`

**Criterio de aceite:**

- Fluxos de auth/profile navegaveis.

**DoD:**

- Users aderente ao padrao arquitetural.

---

### T3.3 - Catalog vertical slice

**Objetivo:** navegacao de catalogo com browse/detail.

**Escopo alvo:**

- `libs/catalog/core/**`
- `libs/catalog/ui-components/**`
- `libs/catalog/features/**`

**Passos tecnicos:**

1. Implementar `catalog.api`, `catalog.store`, `catalog.models`.
2. Implementar feature browse e detail.
3. Usar componentes de dominio do catalog.

**Comandos de validacao:**

- `nx lint catalog-core`
- `nx lint catalog-feature-browse`
- `nx lint catalog-feature-detail`

**Criterio de aceite:**

- Fluxo browse -> detail funcionando.

**DoD:**

- Catalog pronto para demonstracao.

---

## Fase 4 - Shared e cross-dominio

### T4.1 - Shared transversal (sem regra de negocio de dominio)

**Objetivo:** centralizar apenas capacidades comuns.

**Escopo alvo:**

- `libs/shared/ui/**`
- `libs/shared/util-http/**`
- `libs/shared/util-auth/**`
- `libs/shared/interfaces/**`
- `libs/shared/store/**`
- `libs/shared/i18n/**`

**Passos tecnicos:**

1. Criar libs shared com responsabilidade clara.
2. Garantir que shared nao conhece regras de dominio.
3. Expor APIs publicas minimas por `index.ts`.

**Comandos de validacao:**

- `nx lint shared-ui`
- `nx lint shared-util-http`
- `nx lint shared-util-auth`

**Criterio de aceite:**

- Shared reutilizavel e agnostico de dominio.

**DoD:**

- Nenhuma regra de negocio de orders/users/catalog em shared.

---

### T4.2 - Features cross-dominio

**Objetivo:** criar orquestracoes transversais fora de dominios especificos.

**Escopo alvo:**

- `libs/features/checkout-flow/**`
- `libs/features/dashboard/**`
- `libs/features/user-onboarding/**`

**Passos tecnicos:**

1. Criar features cross com rotas/componentes.
2. Consumir contratos permitidos dos dominios.
3. Evitar mover regra de dominio para `libs/features`.

**Comandos de validacao:**

- `nx lint features-checkout-flow`
- `nx lint features-dashboard`
- `nx lint features-user-onboarding`

**Criterio de aceite:**

- Cross-dominio orquestra sem quebrar boundaries.

**DoD:**

- 3 features cross funcionais e aderentes as regras.

---

## Fase 5 - Testes e qualidade

### T5.1 - Testes unitarios baseline

**Objetivo:** cobrir logica critica de core e validadores.

**Escopo alvo:**

- stores/services/apis principais
- validadores de dominio

**Passos tecnicos:**

1. Criar testes unitarios para `orders`, `users`, `catalog` core.
2. Testar validadores de util-validators.
3. Medir tempo de execucao baseline.

**Comandos de validacao:**

- `nx test <project-name>`

**Criterio de aceite:**

- Testes executando sem flakiness e cobrindo regras centrais.

**DoD:**

- Baseline de unit estabelecida para comparacao futura.

---

### T5.2 - E2E com Playwright (fluxos minimos)

**Objetivo:** validar navegacao e fluxo principal no shell.

**Escopo alvo:**

- `shell-e2e/**`

**Passos tecnicos:**

1. Criar suite E2E para:
   - autenticacao basica;
   - navegação de catalogo;
   - fluxo de pedido.
2. Usar dados de mock controlados para previsibilidade.
3. Garantir execucao local sem dependencia externa instavel.

**Comandos de validacao:**

- `nx e2e shell-e2e`

**Criterio de aceite:**

- Suite E2E verde em fluxo principal.

**DoD:**

- Evidencia de qualidade para demo.

---

### T5.3 - Quality gate arquitetural + lint

**Objetivo:** consolidar qualidade tecnica antes da apresentacao.

**Escopo alvo:**

- Todo workspace

**Passos tecnicos:**

1. Rodar lint global.
2. Rodar testes unitarios essenciais.
3. Rodar e2e smoke.
4. Verificar grafo Nx final.

**Comandos de validacao:**

- `nx lint`
- `nx run-many -t lint --all`
- `nx run-many -t test --all`
- `nx e2e shell-e2e --excludeTaskDependencies`
- `nx graph --file=../docs/poc-rebuild/nx-graph.html`

**Criterio de aceite:**

- Sem quebra de regra ou erro bloqueante.

**DoD:**

- Workspace apto para apresentacao.

---

## Fase 6 - Preparacao de demo/pitch

### T6.1 - Script de apresentacao (arquitetura primeiro)

**Objetivo:** evitar repetir falha da primeira POC (foco excessivo em CRUD).

**Escopo alvo:**

- roteiro interno da demo

**Passos tecnicos:**

1. Abrir com problema/objetivo arquitetural.
2. Mostrar estrutura modular por negocio.
3. Mostrar regras Nx e enforcement.
4. Mostrar 2-3 fluxos funcionais minimos.
5. Encerrar com proxima fase (cache/global state).

**Comandos de validacao:**

- Dry run de demo (interno)

**Criterio de aceite:**

- Mensagem arquitetural clara em ate 10-15 minutos.

**DoD:**

- Pitch pronto e repetivel.

---

### T6.2 - Registro de evidencias tecnicas

**Objetivo:** preparar material objetivo para decisao do stakeholder.

**Escopo alvo:**

- capturas/artefatos da POC

**Passos tecnicos:**

1. Salvar evidencia do grafo Nx.
2. Salvar evidencia de bloqueio de import invalido.
3. Salvar resultado de testes principais.
4. Consolidar lista de ganhos vs modelo anterior.

**Comandos de validacao:**

- Revisao de checklist de evidencias

**Criterio de aceite:**

- Evidencias suficientes para suportar recomendacao tecnica.

**DoD:**

- Kit de apresentacao completo.

---

## 2) Checklist de qualidade final (go/no-go)

- [x] Estrutura de `libs/` orientada por negocio.
- [x] Features organizadas por use-case (vertical slice).
- [x] Tags aplicadas em todos os projetos.
- [x] Constraints Nx configuradas e ativas.
- [x] Shared sem regra de negocio de dominio.
- [x] Cross-dominio apenas orquestrando.
- [x] Lint global sem erros bloqueantes.
- [x] Unit tests baseline verdes.
- [x] E2E smoke verde.
- [ ] Roteiro de demo validado.

---

## 3) Checklist de riscos e mitigacoes

- [x] Risco de acoplamento entre dominios mitigado por constraints.
- [ ] Risco de "shared deposito" mitigado por revisao de ownership.
- [ ] Risco de foco excessivo em funcionalidade mitigado por roteiro de pitch.
- [x] Risco de regressao arquitetural mitigado por quality gate.
- [ ] Risco de ambiguidade de implementacao mitigado por tasks com DoD.

---

## 4) Proxima iteracao (fase 2 apos aprovacao da fase modular)

Executar apenas apos aprovacao da estrutura modular:

1. Estrategia de cache por modulo.
2. Invalidation por eventos de update.
3. Integracao state global + state por dominio.
4. Medicao de impacto em performance e complexidade operacional.

