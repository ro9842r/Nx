# Task 18 - Criar `catalog/data-access`

## Objetivo
Criar lib de store/service/api/models do catalogo.

## Comandos
```bash
npx nx g @nx/angular:library catalog/data-access --standalone --buildable --importPath=@my-workspace/catalog/data-access
```

## Descricao detalhada
- Base para `catalog.service.ts`, `catalog.store.ts`, `catalog.api.ts`, `catalog.models.ts`.

## Resultado esperado
- `libs/catalog/data-access/**` gerado.

## Criterio de aceite
- `npx nx lint catalog-data-access` executa.

## Erros comuns e correcao
- ImportPath invalido: manter padrao `@my-workspace/...`.

## Checkpoint
Se aceito, ir para `task-19-create-catalog-ui-components.md`.

