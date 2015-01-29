'use strict';

angular.module('graffitiApp')
    .factory('extension', function() {
        var id = "lcfhlpahgadnfjggdbdineijafkikjep";

        return {
            sendMessage: function(args,cb) {
                // Make a simple request:
                chrome.runtime.sendMessage(id, args,
                    function(response) {
                        cb(response);
                    });
            }
        };
    });
