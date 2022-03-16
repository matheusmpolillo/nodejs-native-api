export function handleGet() {
    return new Map()
        .set('status', 200)
        .set('contentType', 'text/plain')
        .set('content', 'GET - /v1/team')
}

export function handlePost() {
    return new Map()
        .set('status', 200)
        .set('contentType', 'text/plain')
        .set('content', 'POST - /v1/team')
}

export function handlePut() {
    return new Map()
        .set('status', 200)
        .set('contentType', 'text/plain')
        .set('content', 'PUT - /v1/team')
}

export function handleDelete() {
    return new Map()
        .set('status', 200)
        .set('contentType', 'text/plain')
        .set('content', 'DELETE - /v1/team')
}
