# Anotações gerais

- `npx tsc --init` = iniciar um tsconfig.json
- `npx tsc ./caminho` = executa arquivo
- `npm i fastify`
- `npm i tsx -D` : instalar tsx (codigo ts -> codigo js -> executa js)

## Eslint

- `npm i eslint @rocketseat/eslint-config -D`
- Configure o .eslintrc
  
## Var. ambiente

- instalar dotenv
- Colocar o import dotenv/config no daabase.ts
- `npm i zod`: validação de dados de .env, etc
- Validação por zod é criar um arquivo no src/env/index.ts, depois configurar um schema com z e usar o parse() para validar uma info (no caso o env) e exportar essa info validada para fora;

## Cookies

- `npm i @fastify/cookies`

## Testes automatizados

- Tipos:
  - Unitários: testa uma pequena parte, unidade, do código; passa um parametro para a função e vê se o retorno tá ok;
  - Integração: testa a comunicação entre duas ou mais unidades;
  - e2e - end to end, ponta a ponta: simula o usuário operando e chamando tudo junto para ver se tá tudo ok mesmo;
- Pirâmide de testes
  - Primeiro aprenda E2E, não dependem de tecnologias específica, nem arquitetura específica de código;
    - São extremamente lentos; em alta escala, você pode ficar 15, 20 minutos para rodar todos e se um não passar, você perdeu aquele tempo;
- Vitest
  - Usa esbuild = ele suporta ES modules, TS e JSX, permitindo vc compilar o TS para JS para o nodejs entender; por isso, ele é bem mais facil de configurar e mais rápido também;
  - `npm i vitest -D`
- `npm i supertest -D`