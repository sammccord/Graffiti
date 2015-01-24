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

Page.find({}).remove(function() {
    Page.create({
        name: "techcrunch+com+2015+01+20+spacex-raises-1-billion-in-new-funding-from-google-and-fidelity+"
    });
})

Spray.find({}).remove(function() {
    Page.find(function(err, pages) {
        Spray.create({
            name: 'TESTSPRAY',
            targetText: 'Google and Fidelity get an ownership stake'
        }, function(err, spray) {
            console.log(spray);
            pages[0].sprays.push(spray._id);
            pages[0].save();
        })
    })
});

Comment.find({}).remove(function() {
    Spray.find(function(err, sprays) {
        if (sprays.length === 0) setTimeout(function() {
            Spray.find(function(err, sprays) {
                Comment.create({
                    text: 'I COMMENT BLAH BLAH YEAH YEAH WHATEVER'
                }, function(err, comment) {
                    sprays[0].comments.push(comment._id);
                    sprays[0].save();
                })
            });
        },100)
    })
});

Thing.find({}).remove(function() {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});

User.find({}).remove(function() {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@test.com',
        password: 'test'
    }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin'
    }, function() {
        console.log('finished populating users');
    });
});
