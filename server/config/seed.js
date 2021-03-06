/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Page = require('../api/page/page.model');
var Comment = require('../api/comment/comment.model');
var Spray = require('../api/spray/spray.model');
var Organization = require('../api/organization/organization.model');
var async = require('async');

module.exports = function (socketio){
  async.series([
      function(callback){
        Organization.find({}).remove(function() {
          Organization.create({
            name: 'Graffiti'
          }, {
            name: 'Hackernews'
          }, {
            name: 'Fullstack'
          }, {
            name: 'Reddit'
          }, {
            name: '3030'
          }, function(err, organizations) {
            callback();
          })
        });
      },
      function(callback){
        Page.find({}).remove(function() {
          var page = new Page();
          page.name = "techcrunch+com+2015+01+20+spacex-raises-1-billion-in-new-funding-from-google-and-fidelity+";
          page.save(function(err,page){
            Organization.find(function(err,organizations){
              organizations[0].pages.push(page._id);
              organizations[0].save(function(err,org){
                callback();
              })
            });
          });
        });
      },
      function(callback){
        Spray.find({}).remove(function() {
          Page.find(function(err, pages) {
            Spray.create({
              name: 'TESTSPRAY',
              targetText: 'Google and Fidelity get an ownership stake'
            }, function(err, spray) {
              pages[0].sprays.push(spray._id);
              pages[0].save(function(err,org){
                callback();
              });
            })
          })
        });
      },
      function(callback){
        Comment.find({}).remove(function() {
          Spray.find(function(err, sprays) {
            Spray.find(function(err, sprays) {
              Comment.create({
                name: 'First author on page',
                text: 'I COMMENT BLAH BLAH YEAH YEAH WHATEVER'
              }, function(err, comment) {
                sprays[0].comments.push(comment._id);
                sprays[0].save(function(err,spray){
                  callback();
                });
              })
            });
          })
        });
      }
    ],
// optional callback
    function(err, results){
      console.log('finished seeding');
      //require('./namespaces').initialize(socketio);
    });

};
