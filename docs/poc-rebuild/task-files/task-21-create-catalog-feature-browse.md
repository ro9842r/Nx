# Task 21 - Criar `catalog/features/feature-browse`

## Objetivo
Criar use-case de navegacao/listagem de produtos.

## Comandos
```bash
npx nx g @nx/angular:library catalog/features/feature-browse --standalone --buildable --importPath=@my-workspace/catalog/features/feature-browse
npx nx g @nx/angular:component browse --project=catalog-features-feature-browse --standalone
```

## Descricao detalhada
- Cria feature de browse pronta para rota lazy.

## Resultado esperado
- `libs/catalog/features/feature-browse/**` com componente.

## Criterio de aceite
- `npx nx lint catalog-features-feature-browse` executa.

## Erros comuns e correcao
- Projeto nao encontrado: validar nome no `nx show projects`.

## Checkpoint
Se aceito, ir para `task-22-create-catalog-feature-detail.md`.

