(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerRecentJobsCtrl', ['$rootScope', '$scope', '$state', 'AuthService', 'EmployerServices', '$uibModal', 'EmployeeServices', '_',
      function ($rootScope, $scope, $state, AuthService, EmployerServices, $uibModal, EmployeeServices, _) {
        var vm = this;
        var employerId = AuthService.getEmployerId();
        var publicJobPageNo = 0,
            publicJobPageSize = 25;
        vm.publicJobs = [];
        vm.showPublicLoadMore = true;


        vm.requestParams = {
          'userId': AuthService.getEmployerId(),
          'employerId': AuthService.getEmployerId()
        };

        vm.initializeJobs = function() {
          vm.loadMore = {
            'pageNo' : publicJobPageNo,
            'pageSize' : publicJobPageSize
          }
          EmployerServices.viewPublicJobs(vm.requestParams, vm.loadMore, onPublicJobSuccess, onPublicJobError);
        };

        function onPublicJobSuccess(response) {
          var result = response.data;
          if (result.length) {
            _.each(result, function(dataInResult) {
              vm.publicJobs.push(dataInResult);
            });
            if (result.length < publicJobPageSize) {
              vm.showPublicLoadMore = false;
            }
            else {
              vm.showPublicLoadMore = true;
            }
          }
          else {
            vm.showPublicLoadMore = false;
          }
          publicJobPageNo++;
        }

        function onPublicJobError() {
        }

        vm.viewJob = function(jobData, view) {
          $state.go('employer.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employer',
            'viewFrom': view
          });
        };

        vm.loadMorePublicJobs = function() {
          vm.initializeJobs();
        }

        vm.initializeJobs();
      }]);
})();
