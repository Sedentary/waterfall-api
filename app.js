'use strict';

var express = require('express');
var helmet = require('helmet');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./config/routes')(app);

module.exports = app;
