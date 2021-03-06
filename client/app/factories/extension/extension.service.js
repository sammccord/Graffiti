'use strict';

angular.module('graffitiApp')
    .factory('extension', function() {
        var id = "gafalkceddgeafdclmgefpgbphkmdfmo";

        var user = {
          identities:[],
          defaultIdentity: {}
        };

        function sendMessage(args, cb) {
            // Make a simple request:
            chrome.runtime.sendMessage(id, args,
                function(response) {
                    cb(response);
                });
        }

        function getIdentities (cb) {
          sendMessage({
            action:'getIdentities'
          },function(user){
            cb(user);
          })
        }

        function addIdentity (organization,name,org_id,cb) {
          sendMessage({
            action:'addIdentity',
            organization: organization,
            name: name,
            organization_id:org_id
          },function(user){
            cb(user);
          })
        }

        function setDefaultIdentity (organization,name,cb) {
          sendMessage({
            action:'setDefaultIdentity',
            organization: organization,
            name: name
          },function(user){
            cb(user);
          })
        }

        return {
          getIdentities: getIdentities,
          addIdentity: addIdentity,
          setDefaultIdentity: setDefaultIdentity
        };
    });
