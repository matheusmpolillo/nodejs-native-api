/* Dependencies */
import { createServer } from 'http'
import { randomUUID } from 'crypto'

/* Modules */
import Router from './router.js'
import log from '../utils/logger.js'

export default class Server {
    #host
    #port
    #serverTimestamp
    #sockets
    #instance

    constructor(host, port) {
        this.#host            = host
        this.#port            = port
        this.#serverTimestamp = Date.now()
        this.#sockets         = new Map()
        this.#instance        = createServer(
            (request, response) =>
                new Router(request, response, this.#serverTimestamp)
        )
    }

    async listen() {
        return new Promise((resolve, reject) => {
            this.#instance.listen(this.#port, this.#host)
            this.#instance.on('error', (err) => {
                log('error', 'http', err)
                reject(err)
            })
            this.#instance.on('listening', () => {
                log(
                    'info',
                    'http',
                    `Listening on http://${this.#host}:${this.#port}`
                )
                resolve()
            })
            this.#instance.on('connection', (socket) => {
                let socketId = randomUUID()
                this.#sockets.set(socketId, socket)
                log('info', 'http', `Socket ${socketId} opened`)

                socket.on('close', () => {
                    log('info', 'http', `Socket ${socketId} closed`)
                    this.#sockets.delete(socketId)
                })
            })
        })
    }

    async close() {
        this.#instance.close(() => {
            log('info', 'http', 'Server closed!')
        })
        for (let socketId of this.#sockets.keys()) {
            log('info', 'http', `Socket ${socketId} destroyed`)
            let socket = this.#sockets.get(socketId)
            if (socket) this.#sockets.get(socketId).destroy()
        }
    }
}
