/* Dependencies */
import { format } from 'util'

const levels = new Map()
    .set(
        'info',
        new Map()
            .set('tag', '[INFO]')
            .set('color', new Map().set('open', 36).set('close', 39))
    )
    .set(
        'warn',
        new Map()
            .set('tag', '[WARN]')
            .set('color', new Map().set('open', 33).set('close', 39))
    )
    .set(
        'error',
        new Map()
            .set('tag', '[ERROR]')
            .set('color', new Map().set('open', 31).set('close', 39))
    )

/**
 * Function responsible for logging, using level, the informed content.
 *
 * @param {'log' | 'info' | 'warn' | 'error'} level Log level.
 * @param {string} module Module that will be logged.
 * @param {string | Array<string>} content Message content.
 */
export default function log(level, module, content) {
    let colorfulMessage = '[LOG] %s'

    if (level !== 'log') {
        const tag       = levels.get(level).get('tag')
        const open      = levels.get(level).get('color').get('open')
        const close     = levels.get(level).get('color').get('close')
        colorfulMessage = `\u001B[${open}m${tag} (${module})\u001B[${close}m %s`
    }

    if (Array.isArray(content)) {
        content.forEach((message) => {
            process.stderr.write(format(colorfulMessage, message) + '\n')
        })
    } else process.stderr.write(format(colorfulMessage, content) + '\n')
}
