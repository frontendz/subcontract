(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSuggestedJobCtrl', ['$scope', '$location', 'EmployeeServices', 'AuthService', '$state',
       function($scope, $location, EmployeeServices, AuthService, $state) {
        var vm = this;
        var appliedJobPageNo = 0,
            appliedJobPageSize = 25;

        vm.appliedJobs = [];

        vm.initialize = function() {
          var userId = AuthService.getUserId();
          vm.loadMoreApplied = {
            'pageNo' : appliedJobPageNo,
            'pageSize' : appliedJobPageSize
          };
          EmployeeServices.viewSuggestedJobs(userId, vm.loadMoreApplied, onAppliedJobSuccess, onAppliedJobError);
        }

        function onAppliedJobSuccess(response) {
          var result = response.data;
          if (result.length) {
            _.each(result, function(dataInResult) {
              vm.appliedJobs.push(dataInResult);
            });

            if (result.length < appliedJobPageSize) {
              vm.showAppliedLoadMore = false;
            }
            else {
              vm.showAppliedLoadMore = true;
            }
          }
          else {
            vm.showAppliedLoadMore = false;
          }
          appliedJobPageNo++;
        }

        function onAppliedJobError() {
        }

        vm.viewJob = function(jobData, typeOfJob) {
          $state.go('employee.viewAppliedJob', {
            'jobId': jobData.jobId,
            'userType' : 'Employee',
          });
        };

        vm.initialize();
    }]);
})();
