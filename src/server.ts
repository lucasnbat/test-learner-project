import fastify from 'fastify'
// import { knex } from './database'
import { env } from './env';
import { transactionsRoutes } from './routes/transactions';

const app = fastify()

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
