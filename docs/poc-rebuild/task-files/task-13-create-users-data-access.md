# Task 13 - Criar `users/data-access`

## Objetivo
Criar lib de auth/store/models do dominio users.

## Comandos
```bash
npx nx g @nx/angular:library users/data-access --standalone --buildable --importPath=@my-workspace/users/data-access
```

## Descricao detalhada
- Base para `auth.service.ts`, `auth.store.ts`, `user.models.ts`.

## Resultado esperado
- `libs/users/data-access/**` gerado.

## Criterio de aceite
- `npx nx lint users-data-access` executa.

## Erros comuns e correcao
- Nome duplicado de projeto: renomear com prefixo consistente.

## Checkpoint
Se aceito, ir para `task-14-create-users-ui-components.md`.

