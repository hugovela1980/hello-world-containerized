const { serveStaticFiles, serveUploadedFileNames } = require('../services/fileService');
const handleLogRequests = require('../services/loggingService');
const { uploadFiles, deleteFiles } = require('../services/storageService');


const routes = {
    static_files: (data, res) => {
        serveStaticFiles(data, res)
    }, 
    log: (data, res) => {
        handleLogRequests(data, res);
    },
    filenames: (data, res) => {
        serveUploadedFileNames(res);
    },
    upload: (data, res) => {
        uploadFiles(data, res);
    },
    preview: (data, res) => {
        serveStaticFiles(data, res);
    },
    delete: (data, res) => {
        deleteFiles(data, res);
    },
    notFound: (data, res) => {
        const html = `
            <h1>"${data.reqUrl}" not found</h1>
        `;
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(html);
    }
}

module.exports = routes;