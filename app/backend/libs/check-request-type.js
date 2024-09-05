const requestType = (req) => {
    if (req.method === 'POST' && req.url === '/log') return 'logging';
    else if (req.method === 'GET') return 'static files';
};

module.exports = { requestType };