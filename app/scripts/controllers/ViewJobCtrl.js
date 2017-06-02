(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('ViewJobCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'EmployeeServices', 'AuthService', '$uibModal', 'CustomAlertService', '$timeout',
      function ($scope, $state, $stateParams, EmployerServices, EmployeeServices, AuthService, $uibModal, CustomAlertService, $timeout) {
        var vm = this;
        var userType = '';
        vm.viewFrom = '';
        var requestParams = {};
        var candidateIdsList = [];
        var rpCandidateList = {};
        vm.initialize = function() {
          userType = $stateParams.userType;
          vm.viewFrom = $stateParams.viewFrom;
          if (userType === 'Employee') {
            candidateIdsList.push(AuthService.getCandidateId());
            requestParams = {
              'userId': AuthService.getUserId(),
              'jobId': $stateParams.jobId,
            };
            rpCandidateList = {
              'candidateIds' : candidateIdsList
            };
            EmployeeServices.getJobsById(requestParams, onSuccess, onError);
          }
          else {
            requestParams = {
              employerId: AuthService.getEmployerId(),
              jobId: $stateParams.jobId
            };
            EmployerServices.getJobsById(requestParams, onSuccess, onError);
          }
        };

        function onSuccess(response) {
          vm.result = response.data;
        }

        function onError() {
        }
        vm.initialize();

        vm.onSuccessAppliedJobs = function(response) {
          if (response.status === 201) {
            CustomAlertService.alert('Job is applied successfully.');
            $timeout(function() {
              $state.go('employee.dashboard');
            }, 3000);
          }
          else if (response.status === 400) {
            CustomAlertService.alert('You have already applied to this job.');
            $timeout(function() {
              $state.go('employee.dashboard');
            }, 3000);
          }
        };

        vm.onErrorAppliedJobs = function() {
        };

        vm.backToDashboard = function() {
          window.history.back();
        };

        vm.editJob = function(jobData) {
          $state.go('employer.postJob', {'jobId':jobData.jobId});
        };

        vm.openCandidates = function() {
          if (userType === 'Employee') {
            EmployerServices.applyCandidatesForJob(requestParams.jobId, rpCandidateList, vm.onSuccessAppliedJobs, vm.onErrorAppliedJobs);
          }
          else {
            var modalInstance = $uibModal.open({
              templateUrl: 'views/public/candidatesList.html',
              controller: 'CandidatesListCtrl',//EmployerApplyCandidateCtrl.js
              resolve: {
                item: function() {
                  return vm.result;
                }
              },
              size: 'lg'
            });
          }
        };

        vm.shareJob = function(jobData) {
          var modalInstance = $uibModal.open({
            templateUrl: 'views/public/shareJob.html',
            controller: 'ShareJobCtrl',
            resolve: {
              item: function() {
                return jobData;
              }
            },
            size: 'sm'
          });
        };

      }]);
})();
