# Task 36 - Criar suite minima de unit tests

## Objetivo
Cobrir o minimo necessario de logica critica (stores/services/validators).

## Comandos
```bash
npx nx g @nx/angular:setup-unit-test orders-data-access
npx nx g @nx/angular:setup-unit-test users-data-access
npx nx g @nx/angular:setup-unit-test catalog-data-access
npx nx run-many -t test --projects=orders-data-access,users-data-access,catalog-data-access
```

## Descricao detalhada
- Configura e executa testes unitarios nas libs centrais de data-access.

## Resultado esperado
- Suites unitarias executando sem falha.

## Criterio de aceite
- Execucao verde dos testes configurados.

## Erros comuns e correcao
- Projeto sem target `test`: rodar setup-unit-test para ele.

## Checkpoint
Ir para `task-37-create-minimum-e2e-playwright.md`.

