# Task 02 - Instalar dependencias base

## Objetivo
Instalar plugins e dependencias minimas para Angular + lint + testes.

## Comandos
```bash
npm install -D @nx/angular @angular-eslint/schematics eslint prettier
npm install @angular/common @angular/router rxjs zone.js
```

## Descricao detalhada
- `@nx/angular`: habilita generators Angular no Nx.
- `@angular-eslint/schematics` + `eslint`: padrao de lint.
- `prettier`: formatacao de codigo.

## Resultado esperado
- `package.json` atualizado com dependencias necessarias.

## Criterio de aceite
- `npm ls @nx/angular` executa sem erro.

## Erros comuns e correcao
- Conflito de peer dependency: usar `npm install --legacy-peer-deps` apenas se necessario.

## Checkpoint
Se aceito, ir para `task-03-create-shell-app.md`.

