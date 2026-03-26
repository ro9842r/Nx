# Task 26 - Criar `libs/shared/interfaces`

## Objetivo
Criar biblioteca de interfaces comuns (ex.: paginacao, api response).

## Comandos
```bash
npx nx g @nx/angular:library shared/interfaces --standalone --buildable --importPath=@my-workspace/shared/interfaces
```

## Descricao detalhada
- Centraliza contratos tipados reutilizaveis entre dominios.

## Resultado esperado
- `libs/shared/interfaces/**` gerado.

## Criterio de aceite
- `npx nx lint shared-interfaces` executa.

## Erros comuns e correcao
- Interface com regra de negocio especifica: mover para dominio.

## Checkpoint
Ir para `task-27-create-shared-store.md`.

