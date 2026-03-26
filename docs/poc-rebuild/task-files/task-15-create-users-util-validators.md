# Task 15 - Criar `users/util-validators`

## Objetivo
Criar validadores utilitarios do dominio users.

## Comandos
```bash
npx nx g @nx/angular:library users/util-validators --standalone --buildable --importPath=@my-workspace/users/util-validators
```

## Descricao detalhada
- Organiza regras de validacao sem acoplamento de tela.

## Resultado esperado
- `libs/users/util-validators/**` gerado.

## Criterio de aceite
- `npx nx lint users-util-validators` executa.

## Erros comuns e correcao
- Erro de cache Nx: executar `npx nx reset` e repetir lint.

## Checkpoint
Se aceito, ir para `task-16-create-users-feature-profile.md`.

