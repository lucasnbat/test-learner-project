import { it, afterAll, beforeAll, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'

// describe isola e gera um contexto apenas para trnasaction routes
describe('Transactions routes', () => {
    // antes que qualquer teste execute, execute uma vez...
    beforeAll(async () => {
        await app.ready() // aguarde os plugins/rotas serem cadastrados no app
    })

    // após executar todos os testes, jogue a aplicação para fora da memoria
    afterAll(async () => {
        await app.close()
    })

    it('should be able create new transaction normally', async () => {
        await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .send({ // envia os dados
                title: 'Test transaction from Vitest',
                amount: 5000,
                type: 'credit'
            })
            .expect(201) // e aguarda retorno de status 201
    })

    /* 
     * para listar transações precisa criar uma.
     * você NÃO PODE usar o resultado do teste de criar transaction. 
     * então você deve CRIAR uma transaction antes de listar
     * escreva os teste como se só ele existisse
     * ele deve ser ISOLADO de outros contextos
     */
    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .send({ // envia os dados
                title: 'Test transaction from Vitest',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', String(cookies))
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'Test transaction from Vitest',
                amount: 5000,
            })
        ])
    })
})

/**
 * it.only: executa apenas esse teste
 * it.skip: pula o teste
 * it.todo: você usa colocando apenaso enunciado para lembrar que precisa escrever esse teste depois
 */

