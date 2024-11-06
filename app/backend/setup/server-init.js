const config = require('config');
const { logger } = require('./loggerSetup');

const serverInit = (url) => {
  logger.info(config.get('app.startUpMessage').replace(/\{0}/g, url));
  if (config.get('server.environment') === 'development') {
      logger.info('ENVIRONMENT IS SET TO DEVELOPMENT');
  } else {
    logger.info('ENVIRONMENT IS SET TO PRODUCTION');
  }
}

module.exports = serverInit;