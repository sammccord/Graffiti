'use strict';

angular.module('graffitiApp')
    .controller('MainCtrl', function($scope, $http, socket, extension,$cookies) {

      $scope.extensionPresent = false;

      $scope.user = {};

      extension.getIdentities(function(user){
        if(user){
          $scope.extensionPresent = true;
          $cookies.user = JSON.stringify(user);
          $scope.user = user;
        }
        else{
          $scope.extensionPresent = false;
          $scope.user = {};
        }
      });


    	$scope.addIdentity = function (organization,name) {
        extension.addIdentitiy($scope.organization,$scope.name,function(user) {
          $scope.user = user;
          $cookies.user = JSON.stringify(user);
        });
    	};

      $scope.setDefaultIdentity = function (organization,name) {
        extension.setDefaultIdentity(organization,name,function(user){
          $scope.user = user;
          $cookies.user = JSON.stringify(user);
        })
      }
    });
