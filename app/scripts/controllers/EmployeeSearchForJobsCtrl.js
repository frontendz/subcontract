(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchForJobsCtrl', ['$scope', '$location', 'AuthService', 'EmployeeServices', 'EmployerServices', '$state',
          function($scope, $location, AuthService, EmployeeServices, EmployerServices, $state) {
        var vm = this,
        myJobPageNo = 0,
        myJobPageSize = 25;
        var userId = AuthService.getUserId();
        var loadMore = {
          'pageNo' : 0,
          'pageSize' : 1000
        };
        function onSuccessJobs(response) {
          vm.jobsData = response.data;
        }

        function onErrorJobs(response) {

        }

        vm.searchJobs = function() {
          //EmployeeServices.getSearchedJobsByTypes(userId, vm.currentJobs, 'all', onSuccessJobs, onErrorJobs);
          var requestParams = {
            'query' : vm.currentJobs
          }
          EmployerServices.getSearchedJobsGlobal(requestParams, loadMore, onSuccessJobs, onErrorJobs)
        };

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employee'
          });
        };
    }]);
})();
