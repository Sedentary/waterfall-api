'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let LabelSchema = new Schema({
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

LabelSchema.post('validate', function (doc) {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('Label', LabelSchema);
