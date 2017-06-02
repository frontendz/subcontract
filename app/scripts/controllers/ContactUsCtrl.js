(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ContactUsCtrl', ['$scope', 'NgMap',
    function ($scope, NgMap){
      NgMap.getMap().then(function(map) {
      });
    }]);
})();
