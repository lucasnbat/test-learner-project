import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "crypto";
import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

// isso é um plugin do fastify, sempre deve ser function assincrona (async)
export async function transactionsRoutes(app: FastifyInstance) {
    // hook que usa o contexto desse plugin. o plugin trnasactionRoutes tem um contexto só dele, que é manipulável só aqui e vale para todas as rotas
    app.addHook('preHandler', async (request) => {
        console.log(`[${request.method} ${request.url}]`)
    })

    app.get(
        '/',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request) => {

            const { sessionId } = request.cookies;

            const transactions = await knex('transactions')
                .where('session_id', sessionId)
                .select()

            return { transactions };
        })

    app.get(
        '/:id',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request) => {
            const getTransactionParamsSchema = z.object({
                id: z.string().uuid(),
            })
            const { id } = getTransactionParamsSchema.parse(request.params)

            const { sessionId } = request.cookies

            const transaction = await knex('transactions')
                .where({
                    session_id: sessionId,
                    id,
                })
                .first();

            return { transaction }
        })

    app.get(
        '/summary',
        {
            preHandler: [checkSessionIdExists]
        },
        async (request) => {
            const { sessionId } = request.cookies;

            const summary = await knex('transactions')
                .where('session_id', sessionId)
                .sum('amount', { as: 'amount' })
                .first()

            return { summary }
        })

    app.post(
        '/',
        async (request, reply) => {

            const createTransactionBodySchema = z.object({
                title: z.string(),
                amount: z.number(),
                type: z.enum(['credit', 'debit']),
            })

            // destructuring para pegar os valores resultantes do parse
            const { title, amount, type } = createTransactionBodySchema.parse(request.body);

            // adiciona dinamicamente uma chave com o cookie
            let sessionId = request.cookies.sessionId;

            if (!sessionId) {

                // cria sessionId
                sessionId = randomUUID()

                // adiciona o sessionId como info. de cookie guardada na resposta (reply, response)
                reply.cookie('sessionId', sessionId, {
                    path: '/', // quais rotas podem acessar? / = todas
                    maxAge: 60 * 60 * 24 * 7 // 7 days
                })
            }

            // insere dados no banco
            await knex('transactions').insert({
                id: crypto.randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionId,
            })

            return reply.status(201).send();
        })
}

