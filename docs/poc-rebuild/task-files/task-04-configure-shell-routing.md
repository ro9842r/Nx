# Task 04 - Configurar roteamento base do shell

## Objetivo
Garantir que o shell apenas orquestre rotas, sem regra de negocio.

## Comandos
```bash
npx nx g @nx/angular:route home --project=shell --standalone --lazy
```

## Descricao detalhada
- Cria rota lazy inicial para validar padrao de carregamento.
- Serve como base para integrar rotas de dominio depois.

## Resultado esperado
- `app.routes.ts` com pelo menos uma rota lazy funcional.

## Criterio de aceite
- Navegacao para rota criada sem erro no browser.

## Erros comuns e correcao
- Rota nao encontrada: confirmar import/export gerado automaticamente.

## Checkpoint
Se aceito, ir para `task-05-create-orders-domain-structure.md`.

