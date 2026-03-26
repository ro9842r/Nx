# Task 27 - Criar `libs/shared/store`

## Objetivo
Criar biblioteca de estado compartilhado estritamente transversal.

## Comandos
```bash
npx nx g @nx/angular:library shared/store --standalone --buildable --importPath=@my-workspace/shared/store
```

## Descricao detalhada
- Guarda estado global tecnico (ex.: router store), sem regra de negocio.

## Resultado esperado
- `libs/shared/store/**` gerado.

## Criterio de aceite
- `npx nx lint shared-store` executa.

## Erros comuns e correcao
- Logica de dominio no store global: mover para `domain/*/data-access`.

## Checkpoint
Ir para `task-28-create-shared-i18n.md`.

