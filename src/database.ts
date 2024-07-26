import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';
/**
 * Configuração de database
 */

if (!env) {
    throw new Error('Erro! env inexistente!')
}

console.log('Chegou aqui no database.ts=', env.DATABASE_URL)

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: {
        filename: env.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

// constante contendoo setup do Knex com as configurações
export const knex = setupKnex(config)