const pino = require('pino');
const pinoHttp = require('pino-http');

const createLogger = () => {
  const options = {
    level: 'trace',
    customLevels: { custom: 70 },
    redact: {
      paths: ['hostname']
    },
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      }
    },
    timestamp: pino.stdTimeFunctions.isoTime,
  };

  const consoleStream = pino.transport({
    target: 'pino-pretty',
    options: { colorize: true }
  });

  const logger = pino(options, consoleStream);

  const loggerCleanup = () => consoleStream.end();
  
  return { logger, loggerCleanup };
};

const createHttpLogger = (filePath) => {
  const options = {
    level: 'error',
    autoLogging: false,
    customLevels: { custom: 70 },
    useLevel: 'error',
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      }
    }
  };

  const fileStream = pino.transport({
    target: 'pino/file',
    options: {
      destination: filePath,
      mkdir: true,
      level: 'error'
    }
  });

  const httpLogger = pinoHttp(options, fileStream);

  const httpLoggerCleanup = () => {
    fileStream.end();
    consoleStream.end();
  };

  return { httpLogger, httpLoggerCleanup };
};

module.exports = { createLogger, createHttpLogger };