# Task 28 - Criar `libs/shared/i18n`

## Objetivo
Criar biblioteca de internacionalizacao compartilhada.

## Comandos
```bash
npx nx g @nx/angular:library shared/i18n --standalone --buildable --importPath=@my-workspace/shared/i18n
```

## Descricao detalhada
- Estrutura para arquivos de traducao (`en.json`, `es.json`) e setup de i18n.

## Resultado esperado
- `libs/shared/i18n/**` gerado.

## Criterio de aceite
- `npx nx lint shared-i18n` executa.

## Erros comuns e correcao
- Traducoes duplicadas em features: centralizar no shared i18n.

## Checkpoint
Ir para `task-29-create-cross-feature-checkout-flow.md`.

