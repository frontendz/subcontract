(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyConnectionJobPostCtrl', ['$scope', '$state', 'EmployerServices', '$uibModal', 'AuthService', '_',
    function ($scope, $state, EmployerServices, $uibModal, AuthService, _) {
    var vm = this;
    var connectionJobPageNo = 0,
        connectionJobPageSize  = 25;
    vm.showConnectionLoadMore = true;
    vm.connectionJobs = [];
    vm.employerId = AuthService.getEmployerId();

    vm.initialize = function() {
      vm.loadMoreConnection = {
        'pageNo' : connectionJobPageNo,
        'pageSize' : connectionJobPageSize
      };
      EmployerServices.viewMyConnectionPostedJobs(vm.employerId, vm.loadMoreConnection, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
    };
    vm.onGetMyPostedJobsSuccess = function(response) {
      var result = response.data;
      if (result.length) {
        _.each(result, function(dataInResult) {
          vm.connectionJobs.push(dataInResult);
        });

        if (result.length < connectionJobPageSize) {
          vm.showConnectionLoadMore = false;
        }
        else {
          vm.showConnectionLoadMore = true;
        }
      }
      else {
        vm.showConnectionLoadMore = false;
      }
      connectionJobPageNo++;
    };

    vm.onGetMyPostedJobsError = function(response) {
    };
    vm.viewJob = function (jobData) {
      $state.go('employer.viewJob', {
        'jobId': jobData.jobId,
        'userType': 'Employer'
      });
    };

    vm.loadMoreConnectionJobs = function() {
      vm.initialize();
    }
    vm.initialize();
  }]);
})();
