// lê o .env e joga as info no process.env
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333),
})

// validação via zod
const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('Erro: variaveis de ambiente inválidas', _env.error.format)

    throw new Error('Várias de ambiente inválidas!')
}

export const env = _env.data

