const getMimeType = (req) => {
    const fileExt = req.url === '/' ? 'html' : req.url.split('/').pop().split('.')[1];
    if (fileExt === 'html') return 'text/html';
    else if (fileExt === 'css') return 'text/css';
    else if (fileExt === 'js') return 'text/javascript';
    else if (fileExt === 'mjs') return 'text/javascript';
    else if (fileExt === 'jpg') return 'image/jpeg';
    else if (fileExt === 'ico') return 'image/x-icon';
  }

  module.exports = { getMimeType };