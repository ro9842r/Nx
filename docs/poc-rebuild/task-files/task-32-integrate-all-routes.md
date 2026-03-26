# Task 32 - Integrar todas as rotas no shell

## Objetivo
Conectar features de dominio e cross-dominio no `apps/shell`.

## Comandos
```bash
npx nx g @nx/angular:route orders --project=shell --standalone --lazy
npx nx g @nx/angular:route users --project=shell --standalone --lazy
npx nx g @nx/angular:route catalog --project=shell --standalone --lazy
```

## Descricao detalhada
- Cria pontos de entrada de navegacao no shell.
- Depois, ajustar manualmente `app.routes.ts` para apontar para libs de feature corretas.

## Resultado esperado
- Navegacao principal funcional entre areas.

## Criterio de aceite
- `npx nx serve shell` + navegacao pelas rotas sem erro.

## Erros comuns e correcao
- Lazy import errado: revisar caminho do export em `src/index.ts` da feature.

## Checkpoint
Ir para `task-33-apply-nx-tags.md`.

