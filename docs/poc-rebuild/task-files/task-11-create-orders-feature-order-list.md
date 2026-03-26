# Task 11 - Criar `orders/features/feature-order-list`

## Objetivo
Criar use-case de listagem de pedidos no dominio orders.

## Comandos
```bash
npx nx g @nx/angular:library orders/features/feature-order-list --standalone --buildable --importPath=@my-workspace/orders/features/feature-order-list
npx nx g @nx/angular:component order-list --project=orders-features-feature-order-list --standalone
```

## Descricao detalhada
- Primeira linha cria a biblioteca da feature.
- Segunda linha cria componente standalone principal do caso de uso.

## Resultado esperado
- `libs/orders/features/feature-order-list/**` com componente.

## Criterio de aceite
- `npx nx lint orders-features-feature-order-list` executa.

## Erros comuns e correcao
- Nome do projeto diferente: confirmar no `nx show projects`.

## Checkpoint
Se aceito, ir para `task-12-create-orders-feature-checkout.md`.

