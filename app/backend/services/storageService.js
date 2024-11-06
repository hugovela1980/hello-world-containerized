const fs = require('fs');
const path = require('path');
const { httpLogger, logger } = require('../setup/loggerSetup');
const getFileFromMultiPartFormData = require('../libs/get-file-from-multi-part-form-data');
const saveFileToFileSystem = require('../libs/save-file-to-file-system');
const { serveUploadedFileNames, getFileNames } = require('./fileService');

const uploadFiles = ({ headers, buffer }, res) => {
  const files = getFileFromMultiPartFormData(headers, buffer);

  const uploadDirr = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDirr)) fs.mkdirSync(uploadDirr);
  
  files.forEach(file => {
    saveFileToFileSystem(file.name, file.content, uploadDirr);
    logger.info('File Saved: ' + file.name);
  });

  serveUploadedFileNames(res);
};

const deleteFiles = ({ searchParams, req }, res) => {
  const fileName = searchParams.fileName;
  const filePath = path.join(__dirname, '..', 'uploads', fileName);

  fs.unlink(filePath, (error) => {
    if (error) {
      req.log.error({ message: `error deleting file: ${fileName}`, error });
      logger.error({ message: `error deleting file: ${fileName}`, error });
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'File deletion failed' }));
    } else {
      logger.info(`${fileName} successfully deleted`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `File Deleted: ${fileName}`, fileList: getFileNames()}))
    }
  });
}

module.exports = { uploadFiles, deleteFiles };
