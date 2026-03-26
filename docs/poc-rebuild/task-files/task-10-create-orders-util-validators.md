# Task 10 - Criar `orders/util-validators`

## Objetivo
Criar biblioteca de validacoes utilitarias do dominio orders.

## Comandos
```bash
npx nx g @nx/angular:library orders/util-validators --standalone --buildable --importPath=@my-workspace/orders/util-validators
```

## Descricao detalhada
- Guarda funcoes de validacao sem responsabilidade de UI.

## Resultado esperado
- `libs/orders/util-validators/**` gerado.

## Criterio de aceite
- `npx nx lint orders-util-validators` executa.

## Erros comuns e correcao
- Nome longo no importPath: manter padrao curto e consistente.

## Checkpoint
Se aceito, ir para `task-11-create-orders-feature-order-list.md`.

