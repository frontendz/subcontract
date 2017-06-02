(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeStatasticsDataCtrl', ['$scope', '$location', 'EmployeeServices', 'AuthService', '$state',
      function($scope, $location, EmployeeServices, AuthService, $state) {
        var vm = this,
            appliedJobPageNo = 0,
            appliedJobPageSize = 25;

        vm.requestParams = {
          'userId' : AuthService.getUserId()
        };

        function onAppliedJobSuccess(response) {
          vm.appliedData = response.data;
        }

        function onAppliedJobError() {

        }

        function onSuccessRecentJobs(response) {
          vm.recentJobs = response.data;
        }

        function onErrorRecentJobs() {

        }

        vm.redirectToAppliedJob = function() {
          $state.go('employee.appliedJobs');
        }
        vm.initialize = function() {
          vm.loadMoreApplied = {
            'pageNo' : appliedJobPageNo,
            'pageSize' : appliedJobPageSize
          };
          EmployeeServices.viewMyAppliedJobsFromEmployee(vm.requestParams, vm.loadMoreApplied, onAppliedJobSuccess, onAppliedJobError);
          EmployeeServices.viewRecentJobs(onSuccessRecentJobs, onErrorRecentJobs)
        }

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType' : 'Employee'
          });
        };

        vm.loadMoreRecentJobs = function() {
          $state.go('employee.recentMoreJobs');
        };
        vm.initialize();
    }]);
})();
