export default class Router {
    #request
    #response
    #serverTimestamp
    #defaultResponses

    constructor(request, response, serverTimestamp) {
        this.#request          = request
        this.#response         = response
        this.#serverTimestamp  = serverTimestamp
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

        this.#routes()
    }

    #routes() {
        const url    = this.#request.url
        const method = this.#request.method

        const routingMap = this.#checkAndRouting(url, method)

        this.#response.writeHead(routingMap.get('status'), {
            'Content-Type': routingMap.get('contentType')
        })

        return this.#response.end(routingMap.get('content'))
    }

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
            default:
                return this.#defaultResponses.get(404)
        }
    }
}
