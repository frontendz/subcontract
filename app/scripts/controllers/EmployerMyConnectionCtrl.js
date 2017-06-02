(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyConnectionCtrl', ['$state', '$scope', 'EmployerServices', 'AuthService', 'CustomAlertService',
    function ($state, $scope, EmployerServices, AuthService, CustomAlertService) {
    var vm = this;

    vm.initialize = function() {
      vm.myAvailableConnection = true;

      vm.employerId = AuthService.getEmployerId();
      // Calling my Connected Network list
      EmployerServices.myConnectedNetwork(vm.employerId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
    };

    vm.onSuccessMyConnectedNetwork = function(response) {
      vm.result = response.data;
      $scope.orderReverse = false;
      if (vm.result.length > 0) {
        vm.myAvailableConnection = true;
      }
      else {
        vm.myAvailableConnection = false;
      }
    };
    $scope.sortingFn = function( myConnectedEmployer ) {
        return myConnectedEmployer.name.toLowerCase();
    }
    vm.onErrorMyConnectedNetwork = function(response) {
    };

    vm.cancelNetwork = function(employerDetail) {
      EmployerServices.cancelNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessCancelNetwork, vm.onErrorCancelNetwork);
    }

    vm.onSuccessCancelNetwork = function(response) {
      if (response.status === 200) {
        CustomAlertService.alert('Connection is cancelled');
        EmployerServices.myConnectedNetwork(vm.employerId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
      }
    };

    vm.onErrorCancelNetwork = function() {

    };

    vm.redirectSignInEmployers = function() {
      $state.go('employer.recentSignedIn');
    };

    vm.viewConnection = function (connection) {
      $state.go('employer.connectionDetails',{'connectionId': connection.employerId});
    };

    vm.initialize();
  }]);
})();
