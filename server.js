const http = require('http');
const fs = require('fs');
const url = require('url');
const { logger, requestLogger } = require('./logger');

logger.info('Hello Universe');
logger.info('Server started...');

const server = http.createServer().listen(5000);
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
      // Log dropdown log data from landing page to console using Pino logger
      if (data.level === 'TRACE') logger.trace(data.message);
      if (data.level === 'DEBUG') logger.debug(data.message);
      if (data.level === 'INFO') logger.info(data.message);
      if (data.level === 'WARN') logger.warn(data.message);
      // The following log levels are written to /logs/requests.log file
      if (data.level === 'ERROR') {
        req.log.error(data.message); // This log is written to file: /logs/requests.log
        logger.error(data.message);
      } 
      if (data.level === 'FATAL') {
        req.log.fatal(data.message); // This log is written to file: /logs/requests.log
        logger.fatal(data.message);
      } 
      if (data.level === 'CUSTOM') {
        req.log.custom(data.message); // this is a custom level and also written to file: /logs/requests.log
        logger.custom(data.message);
      } 
      
      res.end(JSON.stringify({status: 'request received'}));
    })
  } else {
    // Serve static files to client
    const parsedURL = url.parse(req.url, true);
    let fileName = parsedURL.path.replace(/^\/+|\/+$/g, '');
    if (fileName === '') fileName = 'index.html';
    const path = `./public/${fileName}`;
  
    let mimeType;
    if (fileName.split('.')[1] === 'html') mimeType = 'text/html';
    else if (fileName.split('.')[1] === 'jpg') mimeType = 'image/jpeg';
    else if (fileName.split('.')[1] === 'ico') mimeType = 'image/x-icon';
  
    const file = fs.createReadStream(path);
    file.on('open', () => {
      res.writeHead(200, { 'Content-Type': mimeType });
      file.pipe(res);
      logger.trace(`serving ${fileName} to client`);
      
    });
  }
});