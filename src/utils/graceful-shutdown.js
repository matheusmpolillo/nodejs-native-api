import log from './logger.js'

export default function handleSignal(signals, server) {
    signals.forEach((signal) => {
        signal = signal.toUpperCase()
        process.on(signal, () => {
            log('info', 'system', signal + ' received!')
            server.close()
        })
    })
}
