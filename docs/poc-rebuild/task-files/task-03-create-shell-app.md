# Task 03 - Criar app shell standalone

## Objetivo
Criar `apps/shell` como host principal da aplicacao.

## Comandos
```bash
npx nx g @nx/angular:app shell --routing --standalone --e2eTestRunner=playwright --style=scss
```

## Descricao detalhada
- Gera app Angular standalone.
- Habilita roteamento inicial.
- Cria projeto E2E com Playwright.

## Resultado esperado
- `apps/shell/` e `apps/shell-e2e/` criados.

## Criterio de aceite
- `npx nx serve shell` sobe sem erro.

## Erros comuns e correcao
- Porta ocupada: executar `npx nx serve shell --port=4300`.

## Checkpoint
Se aceito, ir para `task-04-configure-shell-routing.md`.

