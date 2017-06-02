(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerPublicJobsCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', function ($scope, $state, EmployerServices, AuthService, $uibModal) {
    var vm = this;
    vm.result = {};
    vm.requestParams = {};
    var publicJobPageNo = 0,
        publicJobPageSize =  25;

    vm.showPublicLoadMore = true;
    vm.publicJobs = [];

    vm.initialize = function() {
      vm.requestParams = {
        'userId': AuthService.getEmployerId()
      };
      vm.loadMore = {
        'pageNo' : publicJobPageNo,
        'pageSize' : publicJobPageSize
      }
      EmployerServices.viewPublicJobs(vm.requestParams, vm.loadMore, vm.onGetMyPostedJobsSuccess, vm.onGetMyPostedJobsError);
    };
    vm.onGetMyPostedJobsSuccess = function(response) {
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
    };
    vm.onGetMyPostedJobsError = function(response) {
    };

    vm.loadMorePublicJobs = function() {
      vm.initialize();
    }
    
    vm.viewJobOpen = function (jobData) {
      $state.go('employer.viewJob', {
        'jobId': jobData.jobId,
        'userType': 'Employer'
      });
    };
    vm.initialize();
  }]);
})();
