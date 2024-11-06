const fs = require('fs');
const path = require('path');

const saveFileToFileSystem = (fileName, fileContent, fileDirectory) => {
    if (fs.existsSync(path.join(fileDirectory, fileName))) return console.log(fileName);
    fs.writeFileSync(path.join(fileDirectory, fileName), fileContent);
    return;
  }

module.exports = saveFileToFileSystem;