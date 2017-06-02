(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('CandidatesListCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'AuthService', '$uibModalInstance', 'item','$rootScope','$timeout', '$window', 'CustomAlertService',
      function ($scope, $state, $stateParams, EmployerServices, AuthService, $uibModalInstance, item, $rootScope, $timeout, $window, CustomAlertService) {
        $scope.selectedCandidates = [];
        $scope.initialize = function() {
          var employerId = AuthService.getEmployerId();
          var skillsSet = '';
          for(var i=0; i<item.skillDtos.length; i++) {
            skillsSet = skillsSet + item.skillDtos[i].skillId + ',';
          }
          skillsSet = skillsSet.substring(0, skillsSet.length-1);
          EmployerServices.getCandidatesBySkillAndExperience(employerId, skillsSet, item.expFrom, item.expTo, item.jobId, onSuccessViewSkilledCandidate, onErrorViewSkilledCandidate);
        };

        function onSuccessViewSkilledCandidate(response) {
          $scope.candidates = response.data;
          for(var i = 0; i < $scope.candidates.length; i++) {
            $scope.candidates[i].checked = false;
          }
        }

        function onErrorViewSkilledCandidate() {
        }
        $scope.initialize();

        $scope.selectCandidate = function(id, checked) {
          if(checked) {
            $scope.selectedCandidates.push(id);
          } else {
            for(var i=0; i<$scope.selectedCandidates.length; i++) {
              if(id === $scope.selectedCandidates[i]) {
                $scope.selectedCandidates.splice(i, 1);
                break;
              }
            }
          }
          $scope.requestParams = {};
          if ($scope.selectedCandidates.length) {
            $scope.requestParams = {
              'candidateIds' : $scope.selectedCandidates
            };
          }
        };

        $scope.close = function() {
          $uibModalInstance.close();
        };

        $scope.onSuccessAppliedJobs = function() {
          CustomAlertService.alert('Candidate(s) are applied for this job successfully.');

          $timeout(function () {
            $uibModalInstance.close();
          }, 2500);

        };

        $scope.onErrorAppliedJobs = function() {
        };

        $scope.applyCandidateForJob = function() {
          if ($scope.selectedCandidates.length) {
            EmployerServices.applyCandidatesForJob(item.jobId, $scope.requestParams, $scope.onSuccessAppliedJobs, $scope.onErrorAppliedJobs);
          }
        };
      }]);
})();
