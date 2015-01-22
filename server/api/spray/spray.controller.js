'use strict';

var _ = require('lodash');
var Page = require('../page/page.model.js');
var Spray = require('./spray.model');
var Comment = require('../comment/comment.model');

// Get list of sprays
exports.index = function(req, res) {
    Spray.find(function(err, sprays) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, sprays);
    });
};

// Get a single spray
exports.show = function(req, res) {
    Spray.findById(req.params.id)
        .populate('comments')
        .exec(function(err, spray) {
            if (err) {
                return handleError(res, err);
            }
            if (!spray) {
                return res.send(404);
            }
            console.log(spray);
            return res.json(spray);
        });
};

// Creates a new spray in the DB.
exports.create = function(req, res) {
    Page.findOne({
        name: req.body.name
    }, function(err, page) {
        var spray = new Spray({
            target: req.body.target
        });
        spray.save(function(err, spray) {
            page.sprays.push(spray._id);
            page.save(function(err, page) {
                Page.findById(page._id)
                    .populate('comments')
                    .exec(function(err, page) {
                        return res.json(page);
                    })
            })
        })
    })
};

// Updates an existing spray in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Spray.findById(req.params.id, function(err, spray) {
        if (err) {
            return handleError(res, err);
        }
        if (!spray) {
            return res.send(404);
        }
        var updated = _.merge(spray, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, spray);
        });
    });
};

// Deletes a spray from the DB.
exports.destroy = function(req, res) {
    Spray.findById(req.params.id, function(err, spray) {
        if (err) {
            return handleError(res, err);
        }
        if (!spray) {
            return res.send(404);
        }
        spray.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
