import fastify from 'fastify'
// import { knex } from './database'
import { env } from './env';
import { transactionsRoutes } from './routes/transactions';
import cookie from '@fastify/cookie'


const app = fastify()

app.register(cookie)

app.addHook('preHandler', async (request) => {
    console.log(`[${request.method} ${request.url}] = Esse hook está executando em todas as rotas pq vem antes delas!!`)
})

// é tipo o use do express. indica que vai usar as routes do transactionsRoutes
app.register(transactionsRoutes, {
    prefix: 'transactions' // todas as rotas do arq. começam com transactions + o que tem em cada chamada
});

app
    .listen({
        port: env?.PORT,
    })
    .then(() => {
        console.log('Server running on port 3333')
    })
