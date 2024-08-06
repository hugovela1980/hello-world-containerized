const url = require('url');

// Set up logging
const { createLogger, createHttpLogger } = require('./logger');
const logger = createLogger();
const httpLogsPath = './app/backend/logs/requests.log';
const requestLogger = createHttpLogger(httpLogsPath);

const handleLogRequests = (req, res) => {
    let payload = '';
    req.on('data', chunk => {
      payload += chunk;
    });
  
    req.on('end', () => {
      const data = JSON.parse(payload);
      logRequests(req, data);
      writeLogRequestsToFile(req, data);
      res.end(JSON.stringify({ status: 'request received' }));
    })
  };
  
  const logRequests = (req, data) => {
    if (data.level === 'TRACE') logger.trace(data.message);
    if (data.level === 'DEBUG') logger.debug(data.message);
    if (data.level === 'INFO') logger.info(data.message);
    if (data.level === 'WARN') logger.warn(data.message);
    if (data.level === 'ERROR') logger.error(data.message);
    if (data.level === 'FATAL') logger.fatal(data.message);
    if (data.level === 'CUSTOM') logger.custom(data.message);
  }
  
  const writeLogRequestsToFile = (req, data) => {
    if (data.level === 'ERROR') req.log.error(data.message);
    if (data.level === 'FATAL') req.log.fatal(data.message);
    if (data.level === 'CUSTOM') req.log.custom(data.message); // this is a custom level
  };
  
  const getFileRequestData = (req) => {
      let fileName, path, mimeType;
  
      const parsedURL = url.parse(req.url, true).path.replace(/^\/+|\/+$/g, '');
      if (parsedURL === '') fileName = 'index.html';
      else fileName = parsedURL;
      path = `./app/frontend/${fileName}`;
  
      if (fileName.split('.')[1] === 'html') mimeType = 'text/html';
      else if (fileName.split('.')[1] === 'jpg') mimeType = 'image/jpeg';
      else if (fileName.split('.')[1] === 'ico') mimeType = 'image/x-icon';
  
      return { fileName, path, mimeType };
  }

  module.exports = { logger, requestLogger, handleLogRequests, getFileRequestData };