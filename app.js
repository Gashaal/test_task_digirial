'use strict';

const
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
