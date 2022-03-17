import log from './logger.js'

export default function handleSignal(signals, server) {
    signals.forEach((signal) => {
        process.on(signal, () => {
            log('info', 'system', signal + ' received!')
            server.close()
        })
    })
}
