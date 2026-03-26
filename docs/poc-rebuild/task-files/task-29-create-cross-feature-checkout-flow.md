# Task 29 - Criar cross-feature `checkout-flow`

## Objetivo
Criar feature cross-dominio para orquestrar fluxo de checkout.

## Comandos
```bash
npx nx g @nx/angular:library features/checkout-flow --standalone --buildable --importPath=@my-workspace/features/checkout-flow
npx nx g @nx/angular:component checkout-page --project=features-checkout-flow --standalone
```

## Descricao detalhada
- Orquestra dominio `orders` + `catalog` sem carregar regra interna de dominio.

## Resultado esperado
- `libs/features/checkout-flow/**` gerado.

## Criterio de aceite
- `npx nx lint features-checkout-flow` executa.

## Erros comuns e correcao
- Logica de dominio no cross-feature: mover para dominio correspondente.

## Checkpoint
Ir para `task-30-create-cross-feature-dashboard.md`.

