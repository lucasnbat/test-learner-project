import 'dotenv/config'
import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';
/**
 * Configuração de database
 */

if (!env) {
    throw new Error('Erro! env inexistente!')
}

export const config: Knex.Config = {
    client: 'sqlite3',
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