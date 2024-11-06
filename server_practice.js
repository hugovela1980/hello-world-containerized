const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url, true);
    console.log(parsedURL);
    const path = parsedURL.pathname === '/' ? 'home' : parsedURL.pathname.replace(/^\/+|\/+$/g, '');
    console.log(path);

    const queryString = parsedURL.query;
    const headers = req.headers;
    const method = req.method.toLowerCase();
    let buffer = '';

    req.on('data', (data) => console.log('Receiving data'));
    req.on('end', () => {
        console.log('Sending response');
        const route = typeof routes[path] !== 'undefined' ? routes[path] : routes['notFound'];
        const data = {
            path,
            queryString,
            headers,
            method,
            buffer
        };
        route(data, res);
    });
});

server.listen(1234, () => console.log('listening on port 1234'));

const routes = {
    home: (data, res) => {
        const file = fs.createReadStream(path.join(__dirname, 'app', 'frontend', 'server_practice.html'));
        file.on('open', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            file.pipe(res);
        });
        file.on('error', (err) => { 
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Internal Server Error</h1>');
        });
    },
    upload: (data, res) => {
        let img = path.join(__dirname, 'app', 'backend', 'uploads', 'venom.jpg');

        // redundant check
        fs.access(img, fs.constants.F_OK, err => {
            console.log({ img, message: err ? 'File Not Found' : 'File Found' });
        });

        const file = fs.createReadStream(img);
        file.on('open', () => {
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            file.pipe(res);
        });
        file.on('error', (err) => {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>File Not Found</h1>');
        });
        // fs.readFile(img, (err, content) => {
        //     if (err) {
        //         res.writeHead(404, { "Content-Type": "text/html" });
        //         res.end("<h1>File Not Found</h1>");
        //     } else {
        //         res.writeHead(200, { "Content-Type": "image/jpg" });
        //         res.end(content);
        //     }
        // });
    },
    kenny: (data, res) => {
        let payload = {
            name: 'Kenny'
        };
        let payloadStr = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200);
        res.write(payloadStr);
        res.end('\n');
    },
    "cartman": (data, res) => {
        let payload = {
            name: 'Cartman'
        };
        let payloadStr = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200);
        res.write(payloadStr);
        res.end('\n');
    },
    "kenny/is/mysterion": (data, res) => {
        let payload = {
            name: 'Mysterion',
            enemy: 'The Coon',
            today: +new Date(),
            date: new Date()
        };
        let payloadStr = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200);
        res.write(payloadStr);
        res.end('\n');
    },
    notFound: (data, res) => {
        let payload = {
            message: 'File Not Found',
            code: 404
        };
        let payloadStr = JSON.stringify(payload);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(404);
        res.write(payloadStr);
        res.end('\n');
    }
}

/*
https://youtu.be/3a9S3wubxLw?feature=shared

            home: (data, res) => {
    if (data.path === 'home/image') {
        let img = path.join(__dirname, 'app', 'backend', 'uploads', 'venom.jpg');
        fs.readFile(img, (err, content) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<h1>File Not Found</h1>");
            } else {
                res.writeHead(200, { "Content-Type": "image/jpg" });
                res.end(content);
            }
        });
    } else {
        const file = fs.createReadStream(path.join(__dirname, 'app', 'frontend', 'server_practice.html'));
        file.on('open', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            file.pipe(res);
        });
        file.on('error', (err) => { 
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Internal Server Error</h1>');
        });
    }
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Practice</title>
</head>
<body>
    <h1>Image</h1>
    <img id="myImage" style="display: none">
    <button onclick="showImage()">Show Image</button>
    
    <script>
        fetch('/home/image')
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const img = document.getElementById('myImage');
                img.src = url;
            });

        function showImage() {
            const img = document.getElementById('myImage');
            img.style.display = img.style.display === 'none' ? 'block' : 'none';
        }
    </script>
</body>
</html>
        */
