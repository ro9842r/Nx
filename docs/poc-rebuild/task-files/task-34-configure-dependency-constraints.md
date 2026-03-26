# Task 34 - Configurar dependency constraints

## Objetivo
Bloquear imports invalidos entre dominios e tipos.

## Comandos
```bash
npx nx lint
```

## Descricao detalhada
- Configurar regra de `enforce-module-boundaries` no ESLint/Nx.
- Exemplos de bloqueio obrigatorio:
  - `type:ui` nao importa `type:feature`.
  - Dominio A nao importa internals do Dominio B sem contrato permitido.

## Resultado esperado
- Lint acusa violacao quando import invalido e introduzido.

## Criterio de aceite
- `npx nx lint` passa com codigo valido e quebra com violacao proposital.

## Erros comuns e correcao
- Regra muito permissiva: apertar constraints por tag.

## Checkpoint
Ir para `task-35-validate-boundaries.md`.

