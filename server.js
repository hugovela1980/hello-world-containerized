const http = require('http');
const config = require('config');
const serverInit = require('./app/backend/setup/server-init');
const { httpLogger, logger } = require('./app/backend/setup/loggerSetup');
const processRequestObject = require('./app/backend/controllers/requestController');
const routes = require('./app/backend/controllers/routeController');

console.log(process.env.NODE_ENV);
console.log(config);

// Greeting
logger.info(config.get('app.greeting'));

// Start server
const server = http.createServer();
const hostIP = config.get('server.hostIP');
const port = config.get('server.port');
server.listen(port, hostIP, () => serverInit(server));

// Handle http requests
server.on('request', (request, response) => {
    // Attach Pino logger to request object
    httpLogger(request, response);

    // Process request data
    processRequestObject(request)
        .then(requestData => {
            // Route request to appropriate endpoint
            const route = routes[requestData.route] || routes['notFound'];
            route(requestData, response);
        })
        .catch(error => logger.error(error));
});
