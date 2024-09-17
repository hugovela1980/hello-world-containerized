const path = require('path');
const fs = require('fs');
const { getFileRequestData } = require('./libs/get-file-request-data');
const { writeLogsToConsole } = require('./libs/write-logs-to-console');
// const { writeHttpLogsToFile } = require('./libs/write-http-logs-to-file');
const { requestType } = require('./libs/check-request-type');
const { logger, httpLogger } = require('./loggerSetup');

const handleRequests = (req, res) => {
  // httpLogger(req, res);
  
  if (requestType(req) === 'logging') handleLogRequests(req, res, { logger, httpLogger });
  else if (requestType(req) === 'static files') serveStaticFiles(req, res, { logger, httpLogger });
};


const handleLogRequests = (req, res, { logger, httpLogger }) => {
  let payload = '';

  req.on('data', chunk => {
    payload += chunk;
  });

  req.on('end', () => {
    const data = JSON.parse(payload);
    writeLogsToConsole(data, logger);
    // writeHttpLogsToFile(req, data);
    res.end(JSON.stringify({ status: 'request received', msg: data.message }));
  })
};

const serveStaticFiles = (req, res, { logger, httpLogger }) => {
  const basePath = path.join(__dirname, '..', 'frontend');
  const { fileName, filePath, mimeType } = getFileRequestData(req, basePath);

  const file = fs.createReadStream(filePath);
  file.on('open', () => {
    res.writeHead(200, { 'Content-Type': mimeType });
    logger.trace(`serving ${fileName} to client`);
    file.pipe(res);
  });
  file.on('error', (error) => {
    // res.log.custom(`Error serving ${fileName}: ${error.message}`);
    logger.custom(`Error serving ${fileName}: ${error.message}`);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  });
};


module.exports = {
  handleRequests,
  handleLogRequests,
  serveStaticFiles
};

// // Greet Event Emitter
// const greet = {
//   events: { hello: [], update: [], goodbye: [] },

//   helloEmitterStarted: false,
//   updateEmitterStarted: false,
//   goodbyeEmitterStarted: false,
  
//   on: (event, callback) => {
//     if (greet.events[event]) {
//       if (event === 'hello'){
//         greet.events[event].push(callback);
//         if (!greet.helloEmitterStarted) {
//           greet.helloEmitterStarted = true;
//           greet.StartHelloEmitter();
//         }
//       }
//       if (greet.events[event]) {
//         if (event === 'update') {
//           greet.events[event].push(callback);
//           if (!greet.updateEmitterStarted) {
//             greet.updateEmitterStarted = true;
//             greet.StartUpdateEmitter();
//           }
//         }
//       }
//       if (event === 'goodbye') {
//         greet.events[event].push(callback);
//         if (!greet.goodbyeEmitterStarted) {
//           greet.goodbyeEmitterStarted = true;
//           greet.StartGoodbyeEmitter();
//         }
//       }
//     } 
//     else console.log(`Event ${event} does not exist.`);
//   },
//   emit: (event, ...args) => {
//     if (greet.events[event]) greet.events[event].forEach(callback => callback(...args));
//     else console.log(`Event ${event} does not exist.`);
//   },
//   StartHelloEmitter: undefined,
//   StartUpdateEmitter: undefined,
//   StartGoodbyeEmitter: undefined,
// };

// // Parallels defining and importing a package that emits events, such as fs (Node's file system)
// const GREET_PACKAGE = {
//   initGreet: (hello, update, goodbye) => {
//     greet['StartHelloEmitter'] = () => setTimeout(() => greet.emit('hello', hello.name, hello.message), 100);
//     greet['StartUpdateEmitter'] = () => setTimeout(() => greet.emit('update', update.name, update.message), 100);
//     greet['StartGoodbyeEmitter'] = () => setTimeout(() => greet.emit('goodbye', goodbye.name, goodbye.message), 100);
//   }
// };

// // Parallels the usage of the package, such as calling fs.createReadStream() method
// const welcomeUserInput = { name: 'Hugo', message: 'Welcome to the show!' };
// const updateUserInput = { name: welcomeUserInput.name, message: 'Hope you\'re enjoying the show!' };
// const goodbyeUserInput = { name: welcomeUserInput.name, message: 'See you later!' };
// GREET_PACKAGE.initGreet(welcomeUserInput, updateUserInput, goodbyeUserInput);

// // Parallels the usage of the event emitter funnctionality of fs.createReadStream()
// const handleGreetings = (greet) => {
//   let receiptNumber;
//   greet.on('hello', (name, message) => {
//     receiptNumber = name.split('').map(char => char.charCodeAt(0));
//     console.log(`Hello, ${name}! ${message}`);
//   });
//   greet.on('update', (name, message) => console.log(`Hey, ${name}! ${message}`));
//   greet.on('goodbye', (name, message) => console.log(`Goodbye, ${name}! ${message}.  You're receipt number is: ${receiptNumber}`));
// };
// handleGreetings(greet);
