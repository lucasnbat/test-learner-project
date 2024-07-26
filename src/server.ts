import { app } from './app'
import { env } from './env'

app
    .listen({
        port: env?.PORT || 3333,
        host: '0.0.0.0'
    })
    .then(() => {
        console.log('Server running on port 3333')
    })
