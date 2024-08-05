const pino = require('pino');
const pinoHttp = require('pino-http');

const loggerOptions = {
    customLevels: { custom: 35 },
    level: 'trace',
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    },
    timestamp: pino.stdTimeFunctions.isoTime
}

const loggerDest = pino.transport({
    target: 'pino-pretty',
    options: { translateTime: 'SYS:standard' }
})

const logger = pino(loggerOptions, loggerDest);

const requestLoggerOptions = {
    customLevels: { custom: 70 },
    level: 'error',
    redact: {
        paths: [ 'hostname' ]
    } 
};

const requestLoggerDest = pino.transport({
    targets: [
        {
            target: 'pino/file',
            options: {
                destination: './logs/requests.log',
                mkdir: true,
                colorize: false
            }
        }
    ]
})
const requestLogger = pinoHttp(requestLoggerOptions, requestLoggerDest);

module.exports = { logger, requestLogger };