/* Modules */
import {
    handleGet,
    handlePost,
    handlePut,
    handleDelete
} from './controller/team.controller.js'

export default class Router {
    #defaultResponses
    #serverTimestamp

    constructor() {
        this.#defaultResponses = new Map()
            .set(
                405,
                new Map()
                    .set('status', 405)
                    .set('contentType', 'text/plain')
                    .set('content', 'Method not allowed')
            )
            .set(
                404,
                new Map()
                    .set('status', 404)
                    .set('contentType', 'text/plain')
                    .set('content', 'Not found')
            )
    }

    /**
     * Function responsible for checking url and method, and then forwarding to the correct controller.
     *
     * @param {string} url Request url.
     * @param {string} method Request method.
     * @returns {Map} Response.
     */
    #checkAndRouting(url, method) {
        switch (url) {
            case '/ping':
                if (['GET'].indexOf(method) < 0)
                    return this.#defaultResponses.get(405)
                return new Map()
                    .set('status', 200)
                    .set('contentType', 'application/json')
                    .set(
                        'content',
                        JSON.stringify({
                            uptime: new Date() - this.#serverTimestamp,
                            message: 'pong',
                            application: 'js-expert-challenge-1',
                            pid: process.pid
                        })
                    )
            case '/version':
                if (['GET'].indexOf(method) < 0)
                    return this.#defaultResponses.get(405)
                return new Map()
                    .set('status', 200)
                    .set('contentType', 'text/plain')
                    .set('content', 'v1.0.0')
            case '/v1/team':
                const index = ['GET', 'POST', 'PUT', 'DELETE'].indexOf(method)
                if (index < 0) return this.#defaultResponses.get(405)
                switch (index) {
                    case 0:
                        return handleGet()
                    case 1:
                        return handlePost()
                    case 2:
                        return handlePut()
                    case 3:
                        return handleDelete()
                }
            default:
                return this.#defaultResponses.get(404)
        }
    }

    /**
     * Function responsible to create the server routes.
     *
     * @param {IncomingMessage} request Server request.
     * @param {ServerResponse} response Server response.
     * @param {number} serverTimestamp Server startup timestamp.
     * @returns {ServerResponse} Response.
     */
    routes(request, response, serverTimestamp) {
        if (!this.#serverTimestamp) this.#serverTimestamp = serverTimestamp
        const url    = request.url
        const method = request.method

        const routingMap = this.#checkAndRouting(url, method)

        response.writeHead(routingMap.get('status'), {
            'Content-Type': routingMap.get('contentType')
        })

        return response.end(routingMap.get('content'))
    }
}
