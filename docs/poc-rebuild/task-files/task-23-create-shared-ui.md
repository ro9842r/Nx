# Task 23 - Criar `libs/shared/ui`

## Objetivo
Criar biblioteca de UI compartilhada entre dominios.

## Comandos
```bash
npx nx g @nx/angular:library shared/ui --standalone --buildable --importPath=@my-workspace/shared/ui
npx nx g @nx/angular:component button --project=shared-ui --standalone
npx nx g @nx/angular:component input --project=shared-ui --standalone
npx nx g @nx/angular:component modal --project=shared-ui --standalone
```

## Descricao detalhada
- Cria componentes transversais sem regra de negocio.

## Resultado esperado
- `libs/shared/ui/**` com `button`, `input`, `modal`.

## Criterio de aceite
- `npx nx lint shared-ui` executa.

## Erros comuns e correcao
- Regras de dominio em shared: remover imediatamente.

## Checkpoint
Ir para `task-24-create-shared-util-http.md`.

