# Task 08 - Criar `orders/data-access`

## Objetivo
Criar a lib de estado/servico/API do dominio orders.

## Comandos
```bash
npx nx g @nx/angular:library orders/data-access --standalone --buildable --importPath=@my-workspace/orders/data-access
```

## Descricao detalhada
- Cria projeto Nx com `project.json`, `src/index.ts` e `src/lib`.
- Sera a base para `orders.service.ts`, `orders.store.ts`, `orders.api.ts`, `orders.models.ts`.

## Resultado esperado
- `libs/orders/data-access/**` gerado.

## Criterio de aceite
- `npx nx lint orders-data-access` executa.

## Erros comuns e correcao
- Nome de projeto diferente: consultar `npx nx show projects` e ajustar comandos.

## Checkpoint
Se aceito, ir para `task-09-create-orders-ui-components.md`.

