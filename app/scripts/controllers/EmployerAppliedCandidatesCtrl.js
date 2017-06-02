(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('AppliedCandidatesCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'AuthService', '$uibModalInstance', 'item',
      function ($scope, $state, $stateParams, EmployerServices, AuthService, $uibModalInstance, item) {
        var employerId = '';
        $scope.selectedCandidates = [];
        $scope.initialize = function() {
          employerId = AuthService.getEmployerId();
          EmployerServices.viewMyAppliedCandidates(employerId, item.jobId, onSuccessSkills, onErrorSkills);
        };

        function onSuccessSkills(response) {
          $scope.candidates = response.data;
        }

        function onErrorSkills(response) {
        }

        $scope.redirectCandidateDetail = function(candidate) {
          $state.go('employer.employerCandidateDetail', {
            'candidateId': candidate.candidateId,
            'empId': employerId
          });
        };

        $scope.initialize();

        $scope.close = function() {
          $uibModalInstance.close();
        };

      }]);
})();
