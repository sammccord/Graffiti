'use strict';

var _ = require('lodash');
var Page = require('./page.model');
var Spray = require('../spray/spray.model');
var Comment = require('../comment/comment.model.js');
var Organization = require('../organization/organization.model.js');

// Get list of pages
exports.index = function(req, res) {
    console.log(req.params);
    Page.find(function(err, pages) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, pages);
    });
};

// Get a single page
exports.show = function(req, res) {
    console.log('getting page');
    Organization.findById(req.params.org_id)
      .populate('pages')
      .exec(function(err,organization){
        if(!organization) return res.send(404);
        console.log(organization);
        organization.pages.forEach(function(page){
          if(page.name === req.params.page_name){
            Page.findById(page._id)
              .deepPopulate('sprays.comments')
              .exec(function(err,page){
                console.log(page);
                if (err) {
                  return handleError(res, err);
                }
                if (!page) {
                  return res.send(404);
                }
                return res.json(page)
              })
          }
        });
      });
};

// Creates a new page in the DB.
exports.create = function(req, res) {
    var page = new Page({
        name: req.body.page
    });

    var spray = new Spray({
        targetText: req.body.targetText
    });

    var comment = new Comment({
        name: req.body.name,
        text: req.body.text,
        pageRef: req.body.pageRef
    })

    comment.save(function(err, comment) {
        spray.comments.push(comment._id);
        spray.save(function(err, spray) {
            page.sprays.push(spray._id);
            page.save(function(err, page) {
                Page.findById(page._id)
                    .deepPopulate('sprays.comments')
                    .exec(function(err, page) {
                        if (err) {
                            return handleError(res, err);
                        }
                        if (!page) {
                            return res.send(404);
                        }
                        console.log(page);
                        return res.json(page);
                    })
            })
        })
    })
};

// Updates an existing page in the DB.
exports.update = function(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Page.findById(req.params.id, function(err, page) {
        if (err) {
            return handleError(res, err);
        }
        if (!page) {
            return res.send(404);
        }
        var updated = _.merge(page, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, page);
        });
    });
};

// Deletes a page from the DB.
exports.destroy = function(req, res) {
    Page.findById(req.params.id, function(err, page) {
        if (err) {
            return handleError(res, err);
        }
        if (!page) {
            return res.send(404);
        }
        page.remove(function(err) {
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
