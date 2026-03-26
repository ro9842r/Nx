# Task 14 - Criar `users/ui-components`

## Objetivo
Criar biblioteca de UI reutilizavel do dominio users.

## Comandos
```bash
npx nx g @nx/angular:library users/ui-components --standalone --buildable --importPath=@my-workspace/users/ui-components
npx nx g @nx/angular:component avatar --project=users-ui-components --standalone
```

## Descricao detalhada
- Cria biblioteca e componente `avatar` inicial.

## Resultado esperado
- `libs/users/ui-components/**` com `avatar`.

## Criterio de aceite
- `npx nx lint users-ui-components` executa.

## Erros comuns e correcao
- Componente em local errado: validar `--project`.

## Checkpoint
Se aceito, ir para `task-15-create-users-util-validators.md`.

