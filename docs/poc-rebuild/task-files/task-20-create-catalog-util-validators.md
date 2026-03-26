# Task 20 - Criar `catalog/util-validators`

## Objetivo
Criar validadores utilitarios do catalogo.

## Comandos
```bash
npx nx g @nx/angular:library catalog/util-validators --standalone --buildable --importPath=@my-workspace/catalog/util-validators
```

## Descricao detalhada
- Isola regras de validacao do dominio sem acoplamento de UI.

## Resultado esperado
- `libs/catalog/util-validators/**` gerado.

## Criterio de aceite
- `npx nx lint catalog-util-validators` executa.

## Erros comuns e correcao
- Projeto nao aparece: rodar `npx nx show projects`.

## Checkpoint
Se aceito, ir para `task-21-create-catalog-feature-browse.md`.

