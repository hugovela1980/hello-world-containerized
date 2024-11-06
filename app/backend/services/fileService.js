const fs = require('fs');
const pth = require('path');
const { logger } = require('../setup/loggerSetup');

const serveStaticFiles = ({ fileExt, searchParams, fileName, reqUrl, mimeType }, res) => {
  if (!isValidFile(fileExt)) return; 

  let filePath = '';
  if (searchParams.preview || searchParams.delete) filePath = pth.join(__dirname, '..', 'uploads', fileName)
  else filePath = pth.join(__dirname, '..', '..', 'frontend', reqUrl);
  
  const file = fs.createReadStream(filePath);
  file.on('error', (error) => {
    logger.custom(`Error serving ${fileName}: ${error.message}`);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  });
  
  file.on('open', () => {
    res.writeHead(200, { 'Content-Type': mimeType });
    logger.trace(`serving ${fileName} to client`);
    file.pipe(res);
  });
};


const serveUploadedFileNames = (res) => {
  const dirPath = pth.join(__dirname, '..', 'uploads');
  const files = fs.readdirSync(dirPath);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(files));
};

const getFileNames = () => {
  const dirPath = pth.join(__dirname, '..', 'uploads');
  return fs.readdirSync(dirPath);
}

const isValidFile = (fileExt) => {
  const VALID_FILE_EXTENSIONS = ['html', 'css', 'js', 'mjs', 'jpg', 'jpeg', 'png', 'webp', 'ico', 'pdf']
  return VALID_FILE_EXTENSIONS.includes(fileExt);
};

// const serveLowResImage = async ({ searchParams, mimeType }, res) => {
//   const originalImagePath = pth.join(__dirname, '..', 'uploads', searchParams.fileName);
//   if (!fs.existsSync(originalImagePath)) return res.writeHead(404).end();
//   const imageFile = fs.createReadStream(originalImagePath);
//   imageFile.on('data', () => {

//   });
  
//   resizeImageWithSharp(originalImagePath)
//     .then(transformedStream => {
//       res.writeHead(300, { 'Content-Type': mimeType });
//       transformedStream.pipe(res);
//     })
//     .catch(error => {
//       logger.error(error.message);
//       res.writeHead(500, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Error processing image', error: error.message }));
//     })
// };

module.exports = {
  serveStaticFiles,
  serveUploadedFileNames,
  getFileNames,
  isValidFile
}