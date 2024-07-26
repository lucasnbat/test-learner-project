import { afterAll, beforeAll, test } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

// antes que qualquer teste execute, execute uma vez...
beforeAll(async () => {
    await app.ready() // aguarde os plugins/rotas serem cadastrados no app
})

// após executar todos os testes, jogue a aplicação para fora da memoria
afterAll(async () => {
    await app.close()
})

test('User can create new transaction normally', async () => {
    await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
        .post('/transactions') // faz um post em /transactions
        .send({ // envia os dados
            title: 'Test transaction from Vitest',
            amount: 5000,
            type: 'credit'
        })
        .expect(201) // e aguarda retorno de status 201
})