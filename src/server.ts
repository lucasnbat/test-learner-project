import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

app.get('/hello', async () => {

    const transactions = await knex('transactions')
        .select('*')
        .where('id', '988c4c1f-115b-4835-9a81-1902c6801b5e');

    return transactions;
})

app
    .listen({
        port: 3333,
    })
    .then(() => {
        console.log('Server running on port 3333')
    })
