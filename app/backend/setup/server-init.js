const config = require('config');
const { logger } = require('./loggerSetup');

const serverInit = (server) => {
  console.log(server.address().host);
  const host = server.address().host ? server.address().host : 'localhost';
  const port = config.get('server.environment') === 'local' ? server.address().port : config.get('server.hostPort')
  const url = `http://${host}:${port}`
  
  logger.info(config.get('app.startUpMessage').replace(/\{0}/g, url));
  
  if (config.get('server.environment') === 'local') logger.info('ENVIRONMENT IS SET TO LOCAL DEVELOPMENT');
  else if (config.get('server.environment') === 'container') logger.info('ENVIRONMENT IS SET TO CONTAINER DEVELOPMENT');
}

module.exports = serverInit;