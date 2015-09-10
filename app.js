'use strict';

let express = require('express');
let helmet = require('helmet');
let logger = require('morgan');
let bodyParser = require('body-parser');

// Database connection handler
require('./config/mongoose');

let app = express();

app.use(helmet());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

require('./config/routes')(app);

module.exports = app;
