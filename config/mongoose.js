'use strict';

var mongoose = require('mongoose');

var connStr = 'mongodb://waterfall:84060989@ds041603.mongolab.com:41603/waterfall';

mongoose.connect(connStr);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + connStr);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

mongoose.connection.once('open', function () {
    console.log('Mongoose default connection is open');
});

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
