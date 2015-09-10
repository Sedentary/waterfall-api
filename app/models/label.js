'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LabelSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    project: {
        type: ObjectId,
        ref: 'Project',
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

LabelSchema.post('validate', doc => {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('Label', LabelSchema);
