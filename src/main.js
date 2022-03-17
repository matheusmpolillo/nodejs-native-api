/* Modules */
import Server from './server/server.js'
import handleSignal from './utils/graceful-shutdown.js'

/**
 * Start the server on port 3000 of localhost.
 */
;(async () => {
    const server = new Server('0.0.0.0', '3000')
    handleSignal(
        [
            'SIGINT',
            'SIGTERM',
            'SIGHUP',
            'uncaughtException',
            'unhandledRejection'
        ],
        server
    )

    await server.listen()
})()
