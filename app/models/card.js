'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
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

CommentSchema.post('validate', doc => {
    doc.updated_at = Date.now();
});

const CardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    users: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    labels: [
        {
            type: ObjectId,
            ref: 'Label'
        }
    ],
    comments: [CommentSchema],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

CardSchema.post('validate', doc => {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('Card', CardSchema);
