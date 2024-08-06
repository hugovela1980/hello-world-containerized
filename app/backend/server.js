const http = require('http');
const fs = require('fs');
const { logger, requestLogger, handleLogRequests, getFileRequestData } = require('./requests');

// Start server
logger.info('Hello Universe');
const port = 5000;
const server = http.createServer()
server.listen(5000, () => logger.info(`Server started and listening on port ${port}`));

// Handle HTTP requests
let isInitialRequest = true;
server.on('request', (req, res) => {
  requestLogger(req, res);  // Add Pino logger to request object
  if (isInitialRequest) req.log.custom('Server is now receiving requests');
  isInitialRequest = false;
  
  
  if (req.method === 'POST' && req.url === '/log') handleLogRequests(req, res);
  else {
    // Serve static files to client--should this be its own function?
    const { fileName, path, mimeType } = getFileRequestData(req);
    const file = fs.createReadStream(path);
    file.on('open', () => {
      res.writeHead(200, { 'Content-Type': mimeType });
      file.pipe(res);
      logger.trace(`serving ${fileName} to client`);
    });
  }
});