# Task 35 - Validar boundaries no graph/lint

## Objetivo
Gerar evidencia arquitetural para stakeholder.

## Comandos
```bash
npx nx graph
npx nx lint
```

## Descricao detalhada
- `nx graph` mostra topologia real de dependencias.
- `nx lint` confirma enforcement de boundaries.

## Resultado esperado
- Grafo sem acoplamentos indevidos.

## Criterio de aceite
- Sem violacoes bloqueantes de boundary.

## Erros comuns e correcao
- Dependencia circular no grafo: mover contrato para `shared/interfaces`.

## Checkpoint
Ir para `task-36-create-minimum-unit-tests.md`.

