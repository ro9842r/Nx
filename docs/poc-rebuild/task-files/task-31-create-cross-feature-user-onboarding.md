# Task 31 - Criar cross-feature `user-onboarding`

## Objetivo
Criar feature transversal de onboarding de usuario.

## Comandos
```bash
npx nx g @nx/angular:library features/user-onboarding --standalone --buildable --importPath=@my-workspace/features/user-onboarding
npx nx g @nx/angular:component onboarding-page --project=features-user-onboarding --standalone
```

## Descricao detalhada
- Fluxo cross-dominio para onboarding sem quebrar boundaries.

## Resultado esperado
- `libs/features/user-onboarding/**` gerado.

## Criterio de aceite
- `npx nx lint features-user-onboarding` executa.

## Erros comuns e correcao
- Feature muito acoplada ao users domain: extrair para `users/features` se for especifica.

## Checkpoint
Ir para `task-32-integrate-all-routes.md`.

