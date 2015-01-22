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
    sprays: [{
        type: Schema.Types.ObjectId,
        ref: 'Spray'
    }],
    monitor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Page', PageSchema);
