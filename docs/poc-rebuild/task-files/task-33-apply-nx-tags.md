# Task 33 - Aplicar tags Nx em todos os projetos

## Objetivo
Classificar todos os projetos por dominio e tipo.

## Comandos
```bash
npx nx show projects
```

## Descricao detalhada
- Ajustar cada `project.json` com tags, por exemplo:
  - `domain:orders|users|catalog|shared|cross`
  - `type:feature|data-access|ui|util|infra`
- Esta task e manual por arquivo para garantir governanca correta.

## Resultado esperado
- Todos os projetos com tags coerentes.

## Criterio de aceite
- Amostragem de `npx nx show project <project>` confirma tags.

## Erros comuns e correcao
- Tag inconsistente: padronizar antes de seguir para constraints.

## Checkpoint
Ir para `task-34-configure-dependency-constraints.md`.

