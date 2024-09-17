const http = require('http');
const { handleRequests } = require('./app/backend/requests');
const { logger } = require('./app/backend/loggerSetup');

// Start server
const port = 5000;
const server = http.createServer().listen(port, () => logger.info(`Server started and listening on port ${port}`));
logger.info('Hello Universe');


server.on('request', handleRequests);

