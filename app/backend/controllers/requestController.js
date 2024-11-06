const url = require('url');
const pth = require('path');
const { getMimeType } = require('../libs/get-mime-type');

const processRequestObject = (request) => {
    return new Promise((resolve, reject) => {
        const req = request;
        const headers = request.headers;
        const method = request.method.toLowerCase();

        const parsedURL = url.parse(request.url, true);
        if (parsedURL.pathname === '/') parsedURL.pathname = '/index.html';
        const reqUrl = parsedURL.pathname.replace(/^\/+|\/*$/g, ''); // remove leading / from req.url
        const searchParams = parsedURL.query;
        
        let fileName = '';
        if (parsedURL.pathname === '/index.html') fileName = 'index.html';
        else if (searchParams.fileName) fileName = searchParams.fileName;
        else if (!parsedURL.pathname.includes('.')) fileName = null;
        else fileName = reqUrl.split('/').pop();
        const fileExt = fileName ? pth.extname(fileName).replace('.', '') : null;
        const mimeType = fileName ? getMimeType(fileExt) : null;
        
        const route = fileName && !searchParams.delete ? 'static_files' : reqUrl.match(/^\/?([^\/]+)/)[1];

        let buffer = Buffer.alloc(0);
        request.on('data', (chunk) => buffer = Buffer.concat([buffer, chunk]));
        
        request.on('end', () => {
            resolve({
                req,
                parsedURL,
                reqUrl, 
                fileExt,
                fileName,
                mimeType,
                route,
                searchParams,
                headers,
                method,
                buffer: buffer.length > 0 ? buffer : null
            })
        });

        request.on('error', error => {
            reject(error);
        });
    });
}

module.exports = processRequestObject;