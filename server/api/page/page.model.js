'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PageSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    info: String,
    active: Boolean,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    monitor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Page', PageSchema);
