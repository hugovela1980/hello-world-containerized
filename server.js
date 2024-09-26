const http = require('http');
const config = require('config');
const { serverInit, handleRequests } = require('./app/backend/requests');
const { logger } = require('./app/backend/loggerSetup');

// Start server
const server = http.createServer()
const port = config.get('server.port');
const host = config.get('server.host');
const url = `http://${host}:${port}`;

server.listen(port, () => serverInit(url));
server.on('request', (req, res) => handleRequests(req, res));

logger.info(config.get('app.greeting'));
