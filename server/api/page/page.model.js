'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate');

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
    }]
});

PageSchema.plugin(deepPopulate, {});

module.exports = mongoose.model('Page', PageSchema);
