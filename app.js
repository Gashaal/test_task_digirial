'use strict';

const
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  dataRouter = require('routes/data');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.use('/data', dataRouter);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.send(err.message || 'Error');
});

module.exports = app;
