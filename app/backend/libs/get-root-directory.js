const fs = require('fs');
const { get } = require('http');
const path = require('path')

const getRootDirectory = (startDir) => {
    let currentDir = startDir;
    while (currentDir !== path.parse(currentDir).root) {
        if (fs.existsSync(path.join(currentDir, 'package.json'))) return currentDir;
        currentDir = path.dirname(currentDir);
    };
    throw new Error('Root directory not found');
};

module.exports = getRootDirectory;