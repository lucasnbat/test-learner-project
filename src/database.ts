import { knex as setupKnex, Knex } from 'knex';
import { env } from './env';
/**
 * Configuração de database
 */

if (!env) {
    throw new Error('Erro! env inexistente!')
}

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection:
        env.DATABASE_CLIENT === 'sqlite'
            ?
            {
                filename: env.DATABASE_URL,
            }
            :
            env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    }
}

// constante contendoo setup do Knex com as configurações
export const knex = setupKnex(config)