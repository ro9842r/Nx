# Task 09 - Criar `orders/ui-components`

## Objetivo
Criar biblioteca de componentes visuais do dominio orders.

## Comandos
```bash
npx nx g @nx/angular:library orders/ui-components --standalone --buildable --importPath=@my-workspace/orders/ui-components
```

## Descricao detalhada
- Centraliza componentes de apresentacao reutilizaveis do dominio.

## Resultado esperado
- `libs/orders/ui-components/**` gerado.

## Criterio de aceite
- `npx nx lint orders-ui-components` executa.

## Erros comuns e correcao
- Erro de importPath duplicado: usar valor unico.

## Checkpoint
Se aceito, ir para `task-10-create-orders-util-validators.md`.

