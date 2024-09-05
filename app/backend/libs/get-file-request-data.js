const path = require('path');
const { getMimeType } = require('./get-mime-type');

const getFileRequestData = (req, basePath) => {
    if (req.url === '/') {
        return {
            fileName: 'index.html',
            filePath: path.join(basePath + '/index.html'),
            mimeType: getMimeType(req)
        };
    } else {
        return {
            fileName: req.url.split('/').pop(),
            filePath: path.join(basePath, req.url),
            mimeType: getMimeType(req)
        };
    }
}

module.exports = { getFileRequestData };