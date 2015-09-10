'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    private: {
        type: Boolean,
        default: true
    },
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    lists: [
        {
            type: ObjectId,
            ref: 'List'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

ProjectSchema.post('validate', function (doc) {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('Project', ProjectSchema);
