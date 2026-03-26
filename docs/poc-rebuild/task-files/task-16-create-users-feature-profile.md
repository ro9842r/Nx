# Task 16 - Criar `users/features/feature-profile`

## Objetivo
Criar use-case de perfil do usuario.

## Comandos
```bash
npx nx g @nx/angular:library users/features/feature-profile --standalone --buildable --importPath=@my-workspace/users/features/feature-profile
npx nx g @nx/angular:component profile --project=users-features-feature-profile --standalone
```

## Descricao detalhada
- Feature de perfil desacoplada e pronta para rota lazy.

## Resultado esperado
- `libs/users/features/feature-profile/**` com componente.

## Criterio de aceite
- `npx nx lint users-features-feature-profile` executa.

## Erros comuns e correcao
- Falha no nome do projeto: validar saida do generator.

## Checkpoint
Se aceito, ir para `task-17-create-users-feature-auth.md`.

