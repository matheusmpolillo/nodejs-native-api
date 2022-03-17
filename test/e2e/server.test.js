/* Dependencies */
import supertest from 'supertest'

/* Modules */
import Server from '../../src/server/server.js'

describe('E2E - Server', () => {
    const server = new Server('0.0.0.0', '3000').getInstance()

    test('GET - /ping', async () => {
        const result = JSON.parse(
            (
                await supertest(server)
                    .get('/ping')
                    .expect('Content-Type', 'application/json')
                    .expect(200)
            ).text
        )
        expect(result.message).toBe('pong')
    })

    test('GET - /version', async () => {
        const result = (
            await supertest(server)
                .get('/version')
                .expect('Content-Type', 'text/plain')
                .expect(200)
        ).text
        expect(result).toBe('v1.0.0')
    })
})
