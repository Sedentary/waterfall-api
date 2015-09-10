'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProjectSchema = new Schema({
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

ProjectSchema.post('validate', doc => {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('Project', ProjectSchema);
