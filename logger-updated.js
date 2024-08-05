const pino = require('pino');
const pinoHttp = require('pino-http');


const createLogger = (path) => {
  const options = {
    customLevels: { custom: 70 },
    level: 'trace',
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() };
        }
    },
    timestamp: pino.stdTimeFunctions.isoTime
  };

  const destination = pino.transport({
    target: 'pino-pretty',
    options: { translateTime: 'SYS:standard' }
  });
  
  return pino(options, destination);
};

const createHttpLogger = (path) => {
  const options = {
    customLevels: { custom: 70 },
    level: 'error',
    redact: {
      paths: ['hostname']
    }
  };
  
  const destination = pino.transport({
    targets: [
      {
      target: 'pino/file',
        options: {
          destination: path,
          mkdir: true,
          colorize: false
        }
      }
    ]
  });
  
  return pinoHttp(options, destination);
}

module.exports = { createLogger, createHttpLogger };