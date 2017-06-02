(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerRequestManagement', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService) {
      var vm = this;

      var request = $stateParams.request;

      function initialize() {
        EmployerServices.getSearchedJobs(onSearchSuccess, onSearcherror);
      }

      function onSearchSuccess(response) {
      }

      function onSearcherror(response) {
      }

      initialize();

    }]);
})();
