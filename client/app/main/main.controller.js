'use strict';

angular.module('graffitiApp')
    .controller('MainCtrl', function($scope, $http, socket, extension,$cookies) {

      $scope.extensionPresent = false;

      $scope.user = {};

      $scope.organizations = {
        availableOrganizations: []
      };

      $http.get('/api/organizations').
      success(function(data, status, headers, config) {
        $scope.organizations.availableOrganizations = data;
      });

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


    	$scope.addIdentity = function () {
        var _id;
        $scope.organizations.availableOrganizations.forEach(function(org){
          if(org.name === $scope.organization) _id = org._id;
        })
        extension.addIdentity($scope.organization,$scope.name,_id,function(user) {
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
