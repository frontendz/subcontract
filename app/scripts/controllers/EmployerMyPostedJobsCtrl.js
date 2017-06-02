(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyPostedJobsCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', function ($scope, $state, EmployerServices, AuthService, $uibModal) {
    var vm = this;
    var myJobPageNo = 0,
        myJobPageSize = 25;
    vm.showMyLoadMore = true;
    vm.postedJobs = [];
    vm.requestParams = {
      'employerId': AuthService.getEmployerId()
    };

    vm.initialize = function() {
      vm.loadMoreMy = {
        'pageNo' : myJobPageNo,
        'pageSize' : myJobPageSize
      };
      EmployerServices.viewMyPostedJobs(vm.requestParams, vm.loadMoreMy, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
    };

    vm.loadMoreMyJobs = function() {
      vm.initialize();
    };

    vm.onGetMyPostedJobsSuccess = function(response) {
      var result = response.data;
      if (result.length) {
        _.each(result, function(dataInResult) {
          vm.postedJobs.push(dataInResult);
        });

        if (result.length < myJobPageSize) {
          vm.showMyLoadMore = false;
        }
        else {
          vm.showMyLoadMore = true;
        }
      }
      else {
        vm.showMyLoadMore = true;
      }
      myJobPageNo++;
    };
    vm.onGetMyPostedJobsError = function(response) {
    };
    vm.viewJob = function (jobData) {
      $state.go('employer.viewJob', {
        'jobId': jobData.jobId,
        'userType': 'Employer',
        'viewForm' : 'self'
      });
    };

    vm.editJobData = function(jobData) {
      $state.go('employer.postJob', {'jobId':jobData.jobId})
    };

    vm.initialize();
  }]);
})();
