(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchByLocationCtrl', ['$scope', '$state', '$location', 'EmployeeServices', 'AuthService', function($scope, $state, $location, EmployeeServices, AuthService) {
        var vm = this;
        var userId = AuthService.getUserId();
        function onSuccessJobs(response) {
          vm.jobsData = response.data;
        }

        function onErrorJobs(response) {

        }

        vm.searchJobs = function() {
          EmployeeServices.getSearchedJobsByTypes(userId, vm.currentLocation, 'location', onSuccessJobs, onErrorJobs);
        };

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employee'
          });
        };
    }]);
})();
