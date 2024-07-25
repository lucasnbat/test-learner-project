import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";

// isso é um plugin do fastify, sempre deve ser function assincrona (async)
export async function transactionsRoutes(app: FastifyInstance) {
    app.post('/', async (request, response) => {

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        await knex('transactions').insert({
            id: crypto.randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1
        })

        return response.status(201).send();
    })
}

