# Anotações gerais

- npx tsc --init = iniciar um tsconfig.json
- npx tsc ./caminho = executa arquivo
- npm i fastify
- npm i tsx -D : instalar tsx (codigo ts -> codigo js -> executa js)

## Eslint

- npm i eslint @rocketseat/eslint-config -D
- COnfigure .eslintrc
  
## Var. ambiente

- instalar dotenv
- COlocar o import dotenv/config no daabase.ts
- npm i zod: validação de dados de .env, etc
- Validação por zod é criar um arquivo no src/env/index.ts, depois configurar um schema com z e usar o parse() para validar uma info (no caso o env) e exportar essa info validada para fora;