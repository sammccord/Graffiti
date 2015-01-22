'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    name: String,
    info: String,
    active: Boolean,
    user: Object,
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    text: {type:String, required: true}
});

module.exports = mongoose.model('Comment', CommentSchema);
