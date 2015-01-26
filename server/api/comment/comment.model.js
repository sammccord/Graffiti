'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var deepPopulate = require('mongoose-deep-populate');

var CommentSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    user: Object,
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    text: String,
    createdAt: {type: Date, default: Date.now}
});

CommentSchema.plugin(deepPopulate, {});

module.exports = mongoose.model('Comment', CommentSchema);
