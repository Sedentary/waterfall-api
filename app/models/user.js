'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

UserSchema.post('validate', doc => {
    doc.updated_at = Date.now();
    doc.password = crypto.createHash('md5').update(doc.password).digest('hex');
});

module.exports = mongoose.model('User', UserSchema);
