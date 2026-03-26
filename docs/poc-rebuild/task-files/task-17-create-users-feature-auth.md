# Task 17 - Criar `users/features/feature-auth`

## Objetivo
Criar use-case de autenticacao/login.

## Comandos
```bash
npx nx g @nx/angular:library users/features/feature-auth --standalone --buildable --importPath=@my-workspace/users/features/feature-auth
npx nx g @nx/angular:component login --project=users-features-feature-auth --standalone
```

## Descricao detalhada
- Feature para login e rotas de autenticacao.

## Resultado esperado
- `libs/users/features/feature-auth/**` com componente.

## Criterio de aceite
- `npx nx lint users-features-feature-auth` executa.

## Erros comuns e correcao
- Componente sem standalone: recriar com `--standalone`.

## Checkpoint
Se aceito, ir para `task-18-create-catalog-data-access.md`.

