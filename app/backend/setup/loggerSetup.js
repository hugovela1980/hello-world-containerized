const path = require('path');
const config = require('config');
const { createLogger, createHttpLogger } = require('../libs/create-loggers');
const getRootDirectory = require('../libs/get-root-directory');

const { logger, loggerCleanup } = createLogger();

const httpLogPath = path.join(getRootDirectory(__dirname), config.get('server.logFilePath'));
const { httpLogger, httpLoggerCleanup } = createHttpLogger(httpLogPath);

module.exports = {
    logger,
    loggerCleanup,
    httpLogger,
    httpLoggerCleanup,
}