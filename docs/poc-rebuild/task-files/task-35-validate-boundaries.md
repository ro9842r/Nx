# Task 35 - Validar boundaries no graph/lint

## Objetivo
Gerar evidencia arquitetural para stakeholder.

## Comandos
```bash
npx nx graph --file="../docs/poc-rebuild/nx-graph.html"
npx nx run-many -t lint --all
```

## Descricao detalhada
- `nx graph --file` gera artefato versionavel da topologia real de dependencias.
- `nx run-many -t lint --all` confirma enforcement de boundaries em todo o workspace.

## Resultado esperado
- Grafo sem acoplamentos indevidos.

## Criterio de aceite
- Sem violacoes bloqueantes de boundary.

## Erros comuns e correcao
- Dependencia circular no grafo: mover contrato para `shared/interfaces`.

## Checkpoint
Ir para `task-36-create-minimum-unit-tests.md`.

