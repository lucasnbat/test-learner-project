import { it, afterAll, beforeAll, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { } from 'node:test'
import { execSync } from 'node:child_process'

// describe isola e gera um contexto apenas para trnasaction routes
describe('Transactions routes', () => {
    // antes que qualquer teste execute, execute uma vez...
    beforeAll(async () => {
        await app.ready() // aguarde os plugins/rotas serem cadastrados no app
        execSync('npm run knex migrate:latest') // executa comando no terminal em paralelo a execução do código
    })

    // após executar todos os testes, jogue a aplicação para fora da memoria
    afterAll(async () => {
        await app.close()
    })

    beforeAll(async () => {
        execSync('npm run knex migrate:rollback --all')
        execSync('npm run knex migrate:latest')
    })

    it('should be able create new transaction normally', async () => {
        await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .send({ // envia os dados
                title: 'Test transaction',
                amount: 5000,
                type: 'credit'
            })
            .expect(201) // e aguarda retorno de status 201
    })

    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .send({ // envia os dados
                title: 'Test transaction',
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
                title: 'Test transaction',
                amount: 5000,
            })
        ])
    })

    it('should be able to list specific transaction', async () => {
        const createTransactionResponse = await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .send({ // envia os dados
                title: 'Test transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', String(cookies))
            .expect(200)

        // implementação para pegar transaction específica

        // pegando primeira transaction da lista para exemplo
        const transactionId = listTransactionsResponse.body.transactions[0].id

        const getTransactionResponse = await request(app.server)
            .get(`/transactions/${transactionId}`)
            .set('Cookie', String(cookies))
            .expect(200)

        expect(getTransactionResponse.body.transaction).toEqual(
            expect.objectContaining({
                title: 'Test transaction',
                amount: 5000
            })
        )
    })

    it('should be able to get the summary', async () => {
        const createTransactionResponse = await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .send({ // envia os dados
                title: 'Credit transaction',
                amount: 5000,
                type: 'credit'
            })

        const cookies = createTransactionResponse.get('Set-Cookie')

        await request(app.server) // cria uma requisição acessando o servidor nativo do node:http
            .post('/transactions') // faz um post em /transactions
            .set('Cookie', String(cookies))
            .send({ // envia os dados
                title: 'Debit transaction',
                amount: 2000,
                type: 'debit'
            })

        const summaryResponse = await request(app.server)
            .get('/transactions/summary')
            .set('Cookie', String(cookies))
            .expect(200)

        expect(summaryResponse.body.summary).toEqual({
            amount: 3000
        })
    })
})


/*
 * para listar transações precisa criar uma.
 * você NÃO PODE usar o resultado do teste de criar transaction. 
 * então você deve CRIAR uma transaction antes de listar
 * escreva os teste como se só ele existisse
 * ele deve ser ISOLADO de outros contextos
 */

/**
 * it.only: executa apenas esse teste
 * it.skip: pula o teste
 * it.todo: você usa colocando apenaso enunciado para lembrar que precisa escrever esse teste depois
 */

