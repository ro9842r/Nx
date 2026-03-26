# Task 24 - Criar `libs/shared/util-http`

## Objetivo
Criar utilitarios de HTTP compartilhados.

## Comandos
```bash
npx nx g @nx/angular:library shared/util-http --standalone --buildable --importPath=@my-workspace/shared/util-http
```

## Descricao detalhada
- Biblioteca para interceptors e utilitarios de transporte HTTP.

## Resultado esperado
- `libs/shared/util-http/**` gerado.

## Criterio de aceite
- `npx nx lint shared-util-http` executa.

## Erros comuns e correcao
- Dependencia de dominio dentro de util-http: mover para o dominio correto.

## Checkpoint
Ir para `task-25-create-shared-util-auth.md`.

