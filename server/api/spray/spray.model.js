'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SpraySchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    target: {
        text: String,
        image: String,
        div: String
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

module.exports = mongoose.model('Spray', SpraySchema);
