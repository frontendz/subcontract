(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchByCompanyCtrl', ['$scope', '$location', '$state', 'EmployeeServices', 'AuthService', function($scope, $location, $state, EmployeeServices, AuthService) {
        var vm = this;
        var userId = AuthService.getUserId();
        function onSuccessJobs(response) {
          vm.jobsData = response.data;
        }

        function onErrorJobs(response) {

        }

        vm.searchJobs = function() {
          EmployeeServices.getSearchedJobsByTypes(userId, vm.currentCompany, 'name', onSuccessJobs, onErrorJobs);
        };

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employee'
          });
        };
    }]);
})();
