# Relatorio Completo da POC - Nx + Modular Monolith

## 1) Objetivo deste documento

Este relatorio consolida todo o contexto das conversas sobre a POC anterior, traduz o feedback do time em requisitos tecnicos verificaveis e define um plano de reconstrucao assertivo para a nova POC, com foco em:

- alinhamento com a arquitetura esperada pelo time;
- clareza de boundaries entre modulos de negocio;
- uso de Nx para governanca de dependencias;
- estrutura pronta para escalar sem virar monolito desorganizado.

---

## 2) Contexto consolidado das conversas

Pelo historico, a primeira POC demonstrou conhecimento tecnico, mas **nao expressou com clareza o modelo arquitetural que o stakeholder queria enxergar**.

### 2.1 O que foi pedido explicitamente

- Estrutura orientada por **modulo de negocio**, e nao por camada tecnica no topo de `libs/`.
- Dentro de cada modulo, organizacao por **features/use-cases** no estilo vertical slice.
- Capacidade de escalar com novos modulos sem acoplamento acidental.
- Regras arquiteturais aplicadas com Nx (`tags`, `dependency constraints`, grafo).
- Demonstração que a arquitetura se alinha ao backend (mesma ideia de modularidade por dominio).

### 2.2 Pontos que ficaram fracos na tentativa anterior

- A apresentacao focou demais em CRUD/UI e menos em **mensagem arquitetural**.
- A divisao apareceu muito por tipo de camada (feature/data/shared) e pouco por negocio no topo.
- Nao ficou claro, visualmente e por regras, como adicionar um novo modulo de negocio sem quebrar isolamento.
- Faltou demonstrar criterios objetivos de governanca (imports permitidos/proibidos e validacao automatica).

### 2.3 Expectativa real do stakeholder

O stakeholder quer olhar o repositorio e entender rapidamente:

1. Quais sao os modulos de negocio.
2. Quais use-cases cada modulo possui.
3. Quais dependencias sao permitidas entre modulos.
4. Como garantir, por regra automatizada, que o time nao degrade a arquitetura com o tempo.

---

## 3) Requisitos arquiteturais (traduzidos para itens verificaveis)

## R1 - Topologia por negocio no topo de `libs/`

- Deve existir `libs/orders`, `libs/users`, `libs/catalog`.
- Deve existir `libs/features` para fluxos cross-dominio.
- Deve existir `libs/shared` apenas para capacidades transversais sem regra de negocio de dominio.

**Validacao:** inspeção da arvore de pastas e consistencia de nomes.

## R2 - Vertical slice por use-case dentro do dominio

Cada modulo de dominio deve conter:

- `data-access` (estado, models, api/client, service);
- `ui-components` (componentes de apresentacao do dominio);
- `util-validators` (regras utilitarias do dominio);
- `features/feature-*` (casos de uso, com rota e componente da feature).

**Validacao:** cada feature precisa ser autocontida para UI + orquestracao do caso de uso.

## R3 - Standalone components no Angular

- Componentes de feature e componentes de UI devem seguir estrategia standalone.

**Validacao:** uso consistente de componentes standalone nas libs de feature/ui.

## R4 - Governanca de dependencias com Nx

- Definir tags por tipo de biblioteca e por dominio.
- Definir constraints de import para impedir acoplamentos invalidos.
- Evidenciar no grafo Nx que dependencias estao coerentes.

**Validacao:** execucao de lint/graph e tentativa de import invalido bloqueada por regra.

## R5 - Prioridade da POC

- Foco principal: estrutura, boundaries e escalabilidade.
- Foco secundario: comportamento funcional minimo para suportar demo.

**Validacao:** checklist de demo prioriza arquitetura acima de volume de funcionalidade.

## R6 - Test strategy alinhada ao time

- E2E com Playwright.
- Unit inicialmente com baseline vigente (Jest), com opcao de trilha comparativa para Vitest em fase controlada.
- Smoke de arquitetura para garantir regras de import.

**Validacao:** pipeline local com execucao de pelo menos 1 fluxo E2E e testes unitarios minimos.

---

## 4) Estrutura alvo de referencia (solicitada pelo time)

Estrutura esperada para representar a POC:

```text
my-workspace/
├── nx.json
├── .eslintrc.json
├── tsconfig.base.json
├── apps/
│   ├── shell/
│   └── shell-e2e/
└── libs/
    ├── orders/
    ├── users/
    ├── catalog/
    ├── features/
    └── shared/
```

Detalhamento interno alvo por dominio:

- `data-access`: models, store, service, api.
- `ui-components`: componentes reutilizaveis do dominio.
- `util-validators`: validadores/regras utilitarias.
- `features`: cada `feature-*` representa um use-case com rota/componente.

---

## 5) Regras recomendadas de boundaries (Nx)

## 5.1 Tags por projeto

Exemplo de estrategia de tags:

- Dominio:
  - `domain:orders`
  - `domain:users`
  - `domain:catalog`
  - `domain:cross`
  - `domain:shared`
- Tipo:
  - `type:feature`
  - `type:data-access`
  - `type:ui`
  - `type:util`
  - `type:infra`

## 5.2 Regras de dependencia (visao geral)

- `type:feature` pode depender de:
  - `type:data-access`
  - `type:ui`
  - `type:util`
  - `domain:shared`
- `type:data-access` pode depender de:
  - `type:util`
  - `domain:shared`
- `type:ui` nao deve depender de `type:feature`.
- `domain:orders` nao importa internamente de `domain:users`/`domain:catalog` sem passar por contrato permitido.
- `domain:cross` pode orquestrar dominios, sem conter logica interna de dominio.

## 5.3 Evidencias que devem aparecer na demo

- Grafo Nx mostrando isolamento dos dominios.
- Falha proposital de import invalido (ou evidencias de lint) para provar enforcement.
- Explicacao curta de como adicionar novo modulo sem quebrar regras.

---

## 6) Fases de implementacao da nova POC

## Fase 0 - Preparacao e alinhamento

- Confirmar estrutura alvo.
- Definir convencoes de naming.
- Definir tags e constraints.

## Fase 1 - Scaffold estrutural

- Criar app shell e libs por dominio.
- Criar subcamadas padrao em cada dominio.
- Criar features base de cada dominio.

## Fase 2 - Regras arquiteturais

- Aplicar tags em todos os projetos.
- Configurar constraints.
- Rodar graph/lint e validar.

## Fase 3 - Casos de uso verticais minimos

- `orders`: list + checkout.
- `users`: auth + profile.
- `catalog`: browse + detail.

## Fase 4 - Shared e cross-dominio

- `shared/ui`, `shared/util-http`, `shared/util-auth`, `shared/interfaces`, `shared/store`, `shared/i18n`.
- `features/checkout-flow`, `features/dashboard`, `features/user-onboarding`.

## Fase 5 - Testes e qualidade

- E2E basico com Playwright.
- Unit test baseline em libs criticas.
- Validacao de boundaries.

## Fase 6 - Preparacao de apresentacao

- Roteiro de pitch orientado a arquitetura.
- Evidencias de governanca.
- Riscos conhecidos e plano de mitigacao.

---

## 7) Estrategia de testes

## 7.1 Testes arquiteturais (prioridade alta)

- Verificar imports proibidos entre dominios.
- Verificar direcao de dependencias por tipo.
- Verificar que `shared` nao recebe regra de negocio de dominio.

## 7.2 Testes unitarios (prioridade media)

- Cobrir stores/services de `data-access`.
- Cobrir validadores em `util-validators`.

## 7.3 E2E (prioridade media)

- Fluxos minimos de navegacao no shell:
  - login -> dashboard;
  - browse catalog -> detail;
  - order list -> checkout.

## 7.4 Criterio de pronto para teste

- Sem violacoes de boundary.
- Fluxos principais navegaveis.
- Erros de lint bloqueantes resolvidos.

---

## 8) Criterios de aceite para apresentar ao stakeholder

A POC sera considerada pronta para apresentacao quando:

1. Estrutura de pastas refletir claramente modulo -> feature/use-case.
2. Regras de dependencia estiverem implementadas e demonstradas.
3. Shell navegar por features de pelo menos 3 dominios.
4. Shared e cross-dominio estiverem segregados corretamente.
5. Roteiro de demo mostrar alinhamento com o backend modular.
6. Houver checklist de riscos e proximos passos.

---

## 9) Riscos e anti-patterns a evitar

## Risco A - Voltar a organizar por camada tecnica no topo

- **Sinal de erro:** `libs/features`, `libs/data-access`, `libs/ui` como raiz principal de tudo.
- **Mitigacao:** manter raiz por dominio e somente subcamadas dentro de cada dominio.

## Risco B - Shared virar deposito de tudo

- **Sinal de erro:** regras de negocio de orders/users/catalog dentro de `shared`.
- **Mitigacao:** `shared` apenas transversal e agnostico de dominio.

## Risco C - Feature sem autocontencao

- **Sinal de erro:** componente de use-case espalhado em multiplas libs sem criterio.
- **Mitigacao:** manter view/route/orquestracao junto da feature.

## Risco D - Boundary sem enforcement automatizado

- **Sinal de erro:** regras so em documento.
- **Mitigacao:** tags e constraints aplicadas no Nx + validacao automatica.

## Risco E - Demo funcional, mas nao arquitetural

- **Sinal de erro:** foco em telas e CRUD sem prova de governanca.
- **Mitigacao:** reservar bloco de demo para graph, tags e regras.

---

## 10) Checklist de execucao (operacional)

- [ ] Estrutura de pastas criada conforme alvo.
- [ ] Todas as libs com `project.json` e tags coerentes.
- [ ] Regras de dependencia aplicadas e validadas.
- [ ] Features minimas por dominio implementadas.
- [ ] Shared/cross-dominio segregados.
- [ ] E2E e unit baseline executados.
- [ ] Roteiro de demo validado internamente.

## 10.1) Modo oficial de execucao (micro-tasks 1-2h)

Para reduzir risco de erro e aumentar previsibilidade, a execucao desta POC deve seguir o checklist sequencial de micro-entregas (1-2h por item), em ordem estrita:

- `S01` ate `S24`, sem pular etapas;
- cada task com validacao objetiva (comando + criterio de aceite + artefato de saida);
- governance (tags/constraints Nx) tratada como requisito central e nao opcional.

Documento de referencia operacional:

- `docs/poc-rebuild/tasks-tecnicas-poc-modular-monolith-nx.md`
- `docs/poc-rebuild/task-files/README.md` (execucao oficial do zero, 1 task por MD)

---

## 11) Checklist de prontidao para apresentacao

- [ ] Consigo explicar em 2 minutos a logica modulo -> feature -> use-case.
- [ ] Consigo mostrar no grafo que os modulos estao isolados.
- [ ] Consigo demonstrar que import invalido quebra regra.
- [ ] Consigo demonstrar 2-3 fluxos de negocio end-to-end.
- [ ] Consigo justificar escolhas de teste (Playwright + baseline unit).
- [ ] Consigo diferenciar claramente fase 1 (modularidade) e fase 2 (cache/global state).

---

## 12) Proximo documento complementar

Para execucao passo a passo, consultar:

- `docs/poc-rebuild/tasks-tecnicas-poc-modular-monolith-nx.md`

