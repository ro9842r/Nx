# Task 19 - Criar `catalog/ui-components`

## Objetivo
Criar componentes reutilizaveis do dominio catalogo.

## Comandos
```bash
npx nx g @nx/angular:library catalog/ui-components --standalone --buildable --importPath=@my-workspace/catalog/ui-components
npx nx g @nx/angular:component product-card --project=catalog-ui-components --standalone
npx nx g @nx/angular:component product-badge --project=catalog-ui-components --standalone
```

## Descricao detalhada
- Cria a biblioteca e dois componentes base de UI.

## Resultado esperado
- `libs/catalog/ui-components/**` com `product-card` e `product-badge`.

## Criterio de aceite
- `npx nx lint catalog-ui-components` executa.

## Erros comuns e correcao
- Selector duplicado: ajustar nomes dos componentes.

## Checkpoint
Se aceito, ir para `task-20-create-catalog-util-validators.md`.

