'use strict';

const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Database connection handler
require('./config/mongoose');

const app = express();

app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./config/routes')(app);

module.exports = app;
