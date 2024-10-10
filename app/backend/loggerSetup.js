const path = require('path');
const { createLogger, createHttpLogger } = require('./libs/create-loggers');

const { logger, loggerCleanup } = createLogger();

const httpLogPath = path.join(__dirname, process.env.LOGGING_URL);
const { httpLogger, httpLoggerCleanup } = createHttpLogger(httpLogPath);

module.exports = {
    logger,
    loggerCleanup,
    httpLogger,
    httpLoggerCleanup,
}