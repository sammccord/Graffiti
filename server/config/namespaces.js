var Page = require('../api/page/page.model');
var Organization = require('../api/organization/organization.model');

var _nameSpaces = [];

function NameSpace (io,organization) {
  console.log('NAMESPACING',organization._id);
  var nsp = io.of('/org/'+organization._id);
  nsp.on('connection',function(socket){
    console.log('someone connected');
    console.log(organization.name);
  })
}

module.exports.initialize = function(io) {
  console.log('INITIALIZING NAMESPACE');
  Organization.find(function(err,organizations){
    organizations.forEach(function(organization){
      _nameSpaces.push(new NameSpace(io,organization));
    })
  })
};
