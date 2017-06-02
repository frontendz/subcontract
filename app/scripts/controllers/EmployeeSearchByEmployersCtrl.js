(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchByEmployersCtrl', ['$scope', '$location', 'AuthService', 'EmployeeServices', function($scope, $location, AuthService, EmployeeServices) {
        var vm = this;
        var userId = AuthService.getUserId();
        function onSuccessJobs(response) {
          vm.empData = response.data;
        }
        function onErrorJobs(response) {
        }
        vm.searchEmployers = function() {
          EmployeeServices.getSearchedEmployers(userId, vm.searchEmployersText, onSuccessJobs, onErrorJobs);
        };
    }]);
})();
