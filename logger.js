const pino = require('pino');
const pinoHttp = require('pino-http');

const loggerOptions = {
    customLevels: { custom: 35 },
    level: 'trace',
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    }
}

const loggerDest = pino.transport({
    target: 'pino-pretty',
})

const logger = pino(loggerOptions, loggerDest);

const requestLoggerOptions = {
    customLevels: { custom: 35 },
    level: 'error',
    redact: {
        paths: [ 'hostname' ]
    }
};

const requestLoggerDest = pino.transport({
    targets: [
        {
            target: 'pino-pretty',
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