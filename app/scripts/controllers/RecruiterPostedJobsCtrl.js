(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('RecruiterPostedJobsCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'AuthService', '$uibModal',
    function ($scope, $state, $stateParams, EmployerServices, AuthService, $uibModal) {
    var vm = this;
    vm.result = {};
    var recId = $stateParams.teamMemberId;
    vm.initialize = function() {
      vm.requestParams = {
        'employerId': AuthService.getEmployerId(),
        'recruiterId' : recId
      };
      EmployerServices.viewRecruiterPostedJobs(vm.requestParams, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
    };
    vm.onGetMyPostedJobsSuccess = function(response) {
      vm.result = response.data;
    };
    vm.onGetMyPostedJobsError = function() {
    };
    vm.viewJobOpen = function (jobData) {
      $state.go('employer.viewJob', {
        'jobId': jobData.jobId,
        'userType': 'Employer',
        'viewForm' : 'self'
      });
    };

    vm.editJobData = function(jobData) {
      $state.go('employer.postJob', {'jobId':jobData.jobId});
    };

    vm.initialize();
  }]);
})();
