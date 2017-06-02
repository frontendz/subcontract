(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerSentConnectionRequestCtrl', ['$state', '$scope', 'EmployerServices', 'AuthService', '$timeout', 'CustomAlertService',
    function ($state, $scope,  EmployerServices, AuthService, $timeout, CustomAlertService) {
    var vm = this;

    vm.initialize = function() {
      vm.sentNetworkList = true;
      vm.employerId = AuthService.getEmployerId();
      // Calling my Connected Network list
      EmployerServices.sentNetworkRequest(vm.employerId, vm.onSuccessSentNetworkRequest, vm.onErrorSentNetworkRequest);
    };

    vm.onSuccessSentNetworkRequest = function(response) {
      vm.result = response.data;
      $scope.orderReverse = false;
      if (vm.result.length > 0) {
        vm.sentNetworkList = true;
      }
      else {
        vm.sentNetworkList = false;
      }
    };
    $scope.sortingFn = function( myConnectedEmployer ) {
        return myConnectedEmployer.name.toLowerCase();
    }
    vm.onErrorSentNetworkRequest = function(response) {
    };

    vm.cancelRequest = function(employerDetail) {
      vm.deletionEmployer = employerDetail;
      EmployerServices.cancelNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessCancelNetworkRequest, vm.onErrorCancelNetworkRequest);
    };

    vm.onSuccessCancelNetworkRequest = function(response) {
      if (response.status === 200) {
        var ind = vm.result.indexOf(vm.deletionEmployer)
        vm.result.splice(ind, 1);
        vm.deletionEmployer = {};
        CustomAlertService.alert('Sent Request cancelled.')
      }
    };

    vm.onErrorCancelNetworkRequest = function(response) {
    };

    vm.redirectSignInEmployers = function() {
      $state.go('employer.recentSignedIn');
    };

    vm.initialize();
  }]);
})();
