# Task 25 - Criar `libs/shared/util-auth`

## Objetivo
Criar utilitarios de autenticacao compartilhados (guard/token).

## Comandos
```bash
npx nx g @nx/angular:library shared/util-auth --standalone --buildable --importPath=@my-workspace/shared/util-auth
```

## Descricao detalhada
- Biblioteca para guardas, token service e utilitarios cross-cutting de auth.

## Resultado esperado
- `libs/shared/util-auth/**` gerado.

## Criterio de aceite
- `npx nx lint shared-util-auth` executa.

## Erros comuns e correcao
- Acoplamento com feature especifica: extrair para dominio apropriado.

## Checkpoint
Ir para `task-26-create-shared-interfaces.md`.

