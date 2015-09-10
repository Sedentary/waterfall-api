'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ListSchema = new Schema({
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

ListSchema.post('validate', doc => {
    doc.updated_at = Date.now();
});

module.exports = mongoose.model('List', ListSchema);
