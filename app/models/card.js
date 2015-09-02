'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
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

CommentSchema.post('validate', function(doc) {
  doc.updated_at = Date.now();
});

var CardSchema = new Schema({
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

CardSchema.post('validate', function(doc) {
  doc.updated_at = Date.now();
});

module.exports = mongoose.model('Comment', CardSchema);
