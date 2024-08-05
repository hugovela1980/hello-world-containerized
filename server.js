const http = require('http');
const fs = require('fs');
const url = require('url');

// Set up logging
const { createLogger, createHttpLogger } = require('./logger-updated');
const logger = createLogger();
const httpLogsPath = './logs/requests.log';
const requestLogger = createHttpLogger(httpLogsPath);

// Start server
logger.info('Hello Universe');
const port = 5000;
const server = http.createServer().listen(5000, () => logger.info(`Server started and listening on port ${port}`));

// Handle HTTP requests
server.on('request', (req, res) => {
  requestLogger(req, res);  // Add Pino logger to request object
  
  if (req.method === 'POST' && req.url === '/log') {
    // Get dropdown log data from landing page
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });
    
    req.on('end', () => {
      const data = JSON.parse(body);
      logRequests(req, data);
      res.end(JSON.stringify({ status: 'request received' }));
    })
  } else {
    // Serve static files to client
    const { fileName, path, mimeType } = getFileRequestData(req);
    const file = fs.createReadStream(path);
    file.on('open', () => {
      res.writeHead(200, { 'Content-Type': mimeType });
      file.pipe(res);
      logger.trace(`serving ${fileName} to client`);
    });
  }
});

const logRequests = (req, data) => {
  if (data.level === 'TRACE') logger.trace(data.message);
  if (data.level === 'DEBUG') logger.debug(data.message);
  if (data.level === 'INFO') logger.info(data.message);
  if (data.level === 'WARN') logger.warn(data.message);
  // The following log levels are written to /logs/requests.log file
  if (data.level === 'ERROR') {
    req.log.error(data.message);
    logger.error(data.message);
  } 
  if (data.level === 'FATAL') {
    req.log.fatal(data.message);
    logger.fatal(data.message);
  } 
  if (data.level === 'CUSTOM') {
    req.log.custom(data.message); // this is a custom level
    logger.custom(data.message);
  } 
}

const getFileRequestData = (req) => {
    let fileName, path, mimeType;

    const parsedURL = url.parse(req.url, true).path.replace(/^\/+|\/+$/g, '');
    if (parsedURL === '') fileName = 'index.html';
    else fileName = parsedURL;
    path = `./public/${fileName}`

    if (fileName.split('.')[1] === 'html') mimeType = 'text/html';
    else if (fileName.split('.')[1] === 'jpg') mimeType = 'image/jpeg';
    else if (fileName.split('.')[1] === 'ico') mimeType = 'image/x-icon';

    return { fileName, path, mimeType };
}