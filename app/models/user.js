'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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

UserSchema.post('validate', function (doc) {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('User', UserSchema);
