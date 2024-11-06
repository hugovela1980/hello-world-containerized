const getMimeType = (fileExt) => {
  if (fileExt === 'html') return 'text/html';
  else if (fileExt === 'css') return 'text/css';
  else if (fileExt === 'js') return 'text/javascript';
  else if (fileExt === 'mjs') return 'text/javascript';
  else if (fileExt === 'jpg') return 'image/jpeg';
  else if (fileExt === 'jpeg') return 'image/jpeg';
  else if (fileExt === 'png') return 'image/png';
  else if (fileExt === 'webp') return 'image/webp';
  else if (fileExt === 'ico') return 'image/x-icon';
  else if (fileExt === 'pdf') return 'application/pdf';
}

  module.exports = { getMimeType };