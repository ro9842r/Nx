# Task 22 - Criar `catalog/features/feature-detail`

## Objetivo
Criar use-case de detalhe do produto.

## Comandos
```bash
npx nx g @nx/angular:library catalog/features/feature-detail --standalone --buildable --importPath=@my-workspace/catalog/features/feature-detail
npx nx g @nx/angular:component detail --project=catalog-features-feature-detail --standalone
```

## Descricao detalhada
- Cria feature de detalhe vinculada ao dominio catalog.

## Resultado esperado
- `libs/catalog/features/feature-detail/**` com componente.

## Criterio de aceite
- `npx nx lint catalog-features-feature-detail` executa.

## Erros comuns e correcao
- Rota de detalhe faltando: sera integrada na task 32.

## Checkpoint
Se aceito, ir para `task-23-create-shared-ui.md`.

