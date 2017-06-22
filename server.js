'use strict';

let app = require('app');
const http = require('http');
const debug = require('debug')('test_task_digirial:server');
const port = 3000;

app.set('port', port);

let server = http.createServer(app);
server.listen(port);

server.on('error', err => {
  throw err;
});

server.on('listening', () => {
  const address = server.address();
  debug(`Listening on ${address.port}`);
});
