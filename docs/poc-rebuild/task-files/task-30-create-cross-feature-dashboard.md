# Task 30 - Criar cross-feature `dashboard`

## Objetivo
Criar feature cross-dominio para dashboard.

## Comandos
```bash
npx nx g @nx/angular:library features/dashboard --standalone --buildable --importPath=@my-workspace/features/dashboard
npx nx g @nx/angular:component dashboard-page --project=features-dashboard --standalone
```

## Descricao detalhada
- Dashboard agrega informacoes de multiplos dominios com baixo acoplamento.

## Resultado esperado
- `libs/features/dashboard/**` gerado.

## Criterio de aceite
- `npx nx lint features-dashboard` executa.

## Erros comuns e correcao
- Dependencia circular: revisar imports e mover contratos para shared interfaces.

## Checkpoint
Ir para `task-31-create-cross-feature-user-onboarding.md`.

