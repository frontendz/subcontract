(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyCandidatesCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', '$stateParams',
    function ($scope, $state, EmployerServices, AuthService, $uibModal, $stateParams) {
    var vm = this;
    var employerId = '';

    if ($stateParams.candidates !== undefined) {
      vm.candidates = $stateParams.candidates;
    }
    else {
      vm.candidates = 'all';
    }

    vm.result = {};

    vm.initialize = function() {
      employerId  = AuthService.getEmployerId();
      EmployerServices.viewMyCandidates(employerId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
    };
    vm.onSuccessMyCandidates = function(response) {
      vm.result = response.data;
    };
    vm.onErrorMyCandidates = function() {
    };
    vm.viewCandidateOpen = function (candidateData) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/public/viewCandidate.html',
        controller: 'ViewCandidateCtrl',
        controllerAs: 'viewCandidateCtrl',
        size: 'lg',
        windowClass : 'view-job-window',
        backdropClass : 'view-job-window-backdrop',
        backdrop : 'static',
        resolve: {
          items: function () {
            return candidateData;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        vm.selected = selectedItem;
      }, function () {
      });
    };

    vm.activeInactive = function(candidateData, activeOrInactiveType) {
      EmployerServices.activeOrInactive(employerId, candidateData.candidateId, activeOrInactiveType, vm.onSuccessActiveOrInactive, vm.onErrorActiveOrInactive);
    };

    vm.onSuccessActiveOrInactive = function() {
      employerId  = AuthService.getEmployerId();
      EmployerServices.viewMyCandidates(employerId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
    };

    vm.onErrorActiveOrInactive = function() {
    };

    vm.placeOrOnBenchFunction = function(candidateData, placeOrOnBenchType) {
      EmployerServices.placeOrOnBench(employerId, candidateData.candidateId, placeOrOnBenchType, vm.onSuccessPlaceOrBench, vm.onErrorPlaceOrBench);
    };

    vm.onSuccessPlaceOrBench = function() {
      employerId  = AuthService.getEmployerId();
      EmployerServices.viewMyCandidates(employerId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
    };

    vm.onErrorPlaceOrBench = function() {
    };

    vm.editCandidate = function(candidateData) {
      $state.go('employer.addNewCandidate', {'candidateId':candidateData.candidateId});
    };

    vm.initialize();
  }]);
})();
