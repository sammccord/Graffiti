/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Spray = require('./spray.model');

exports.register = function(socket) {
  Spray.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Spray.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('spray:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('spray:remove', doc);
}