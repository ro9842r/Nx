# Task 01 - Inicializar workspace Nx do zero

## Objetivo
Criar um workspace novo chamado `my-workspace` sem legado.

## Comandos
```bash
npx create-nx-workspace@latest my-workspace --preset=apps --pm=npm --nxCloud=skip --interactive=false
cd my-workspace
```

## Descricao detalhada
- `create-nx-workspace`: cria o monorepo Nx do zero.
- `--preset=apps`: estrutura base para apps/libs.
- `--nxCloud=skip`: evita configuracao de Nx Cloud neste momento.

## Resultado esperado
- Pasta `my-workspace/` criada com `nx.json` e configuracoes base.

## Criterio de aceite
- `npx nx --version` retorna versao sem erro.

## Erros comuns e correcao
- Erro de permissao no npm: executar terminal como administrador.
- Erro de rede: repetir comando apos limpar cache do npm.

## Checkpoint
Se aceito, ir para `task-02-install-deps.md`.

