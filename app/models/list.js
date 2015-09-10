'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let ListSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cards: [
        {
            type: ObjectId,
            ref: 'Card'
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

ListSchema.post('validate', function (doc) {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('List', ListSchema);
