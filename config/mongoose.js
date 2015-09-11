'use strict';

const mongoose = require('mongoose');

const connStr = process.env.WATERFALL_DB || 'mongodb://localhost:27017/waterfall-dev';

mongoose.connect(connStr);

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + connStr);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

mongoose.connection.once('open', () => {
    console.log('Mongoose default connection is open');
});

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
