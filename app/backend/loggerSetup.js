const { createLogger, createHttpLogger } = require('./libs/create-loggers');

const { logger, loggerCleanup } = createLogger();
// const httpLogPath = path.join(__dirname, 'app', 'backend', 'logs', 'http.log');
// const { httpLogger, httpLoggerCleanup } = createHttpLogger(httpLogPath);

module.exports = {
    logger,
    loggerCleanup,
    // httpLogger,
    // httpLoggerCleanup,
}