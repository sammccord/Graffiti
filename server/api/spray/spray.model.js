'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate');

var SpraySchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    targetText: String,
    targetDiv: String,
    targetImage: String,
    organization: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }]
});

SpraySchema.plugin(deepPopulate, {});

module.exports = mongoose.model('Spray', SpraySchema);
