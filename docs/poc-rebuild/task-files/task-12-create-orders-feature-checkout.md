# Task 12 - Criar `orders/features/feature-checkout`

## Objetivo
Criar use-case de checkout no dominio orders.

## Comandos
```bash
npx nx g @nx/angular:library orders/features/feature-checkout --standalone --buildable --importPath=@my-workspace/orders/features/feature-checkout
npx nx g @nx/angular:component checkout --project=orders-features-feature-checkout --standalone
```

## Descricao detalhada
- Gera a feature de checkout desacoplada do shell.

## Resultado esperado
- `libs/orders/features/feature-checkout/**` com componente principal.

## Criterio de aceite
- `npx nx lint orders-features-feature-checkout` executa.

## Erros comuns e correcao
- Component gerado no projeto errado: repetir comando com `--project` correto.

## Checkpoint
Se aceito, ir para `task-13-create-users-data-access.md`.

