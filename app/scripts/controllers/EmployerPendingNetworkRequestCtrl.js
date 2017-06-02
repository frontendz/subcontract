(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerPendingNetworkRequestCtrl', ['$state', '$scope', 'EmployerServices', 'AuthService', 'CustomAlertService',
    function ($state, $scope, EmployerServices, AuthService, CustomAlertService) {
    var vm = this;

    vm.initialize = function() {
      vm.myPendingRequest = false;
      vm.employerId = AuthService.getEmployerId();

      // Calling my Connected Network list
      EmployerServices.pendingNetworkRequest(vm.employerId, vm.onSuccessPendingNetworkRequest, vm.onErrorPendingNetworkRequest);
    };

    vm.onSuccessPendingNetworkRequest = function(response) {
      vm.result = response.data;
      $scope.orderReverse = false;
      if (vm.result.length > 0) {
        vm.myPendingRequest = true;
      }
      else {
        vm.myPendingRequest = false;
      }
    };
    $scope.sortingFn = function( myConnectedEmployer ) {
        return myConnectedEmployer.name.toLowerCase();
    }
    vm.onErrorPendingNetworkRequest = function(response) {
    }

    vm.rejectRequest = function(employerDetail) {
      EmployerServices.cancelNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessAcceptNetworkRequest, vm.onErrorAcceptNetworkRequest);
    }

    vm.acceptRequest = function(employerDetail) {
      EmployerServices.acceptNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessAcceptNetworkRequest, vm.onErrorAcceptNetworkRequest);
    };

    vm.onSuccessAcceptNetworkRequest = function(response) {
      if (response.status === 200) {
        CustomAlertService.alert('Request is accepted successfully.')
        EmployerServices.pendingNetworkRequest(vm.employerId, vm.onSuccessPendingNetworkRequest, vm.onErrorPendingNetworkRequest);
      }
    };

    vm.onErrorAcceptNetworkRequest = function(response) {
    };

    vm.initialize();
  }]);
})();
