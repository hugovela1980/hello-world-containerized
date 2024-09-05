const http = require('http');
const { handleAllRequests, handleLogRequests, serveStaticFiles } = require('./app/backend/requests');
const { logger, httpLogger } = require('./app/backend/loggerSetup');

// Start server
const port = 5000;
const server = http.createServer().listen(port, () => logger.info(`Server started and listening on port ${port}`));
logger.info('Hello Universe');


server.on('request', handleAllRequests);

