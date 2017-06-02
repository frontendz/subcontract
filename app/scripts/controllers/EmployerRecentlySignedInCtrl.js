(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerRecentlySignedInCtrl', ['$state', 'EmployerServices', 'UserMetaDataService', 'AuthService', 'CustomAlertService', '$timeout',
    function ($state, EmployerServices, UserMetaDataService, AuthService, CustomAlertService, $timeout) {
    var vm = this;
    var employerId = AuthService.getEmployerId();


    vm.initialize = function() {
      vm.myAvailableConnection = false;
      vm.requestParams = {};
      EmployerServices.getAllSignedInEmployer(employerId, vm.onSuccessAllSignedInEmployer, vm.onErrorAllSignedInEmployer);
    };

    vm.onSuccessAllSignedInEmployer = function(response) {
      vm.result = response.data;
    };
    vm.onErrorAllSignedInEmployer = function(response) {
    };

    vm.connectToEmployer = function(requestId) {

      vm.requestParams = {
        'requestedTo' : requestId.employerId
      };
      EmployerServices.sendNetworkRequest(employerId, vm.requestParams, vm.onSuccessSendNetworkRequest, vm.onErrorSendNetworkRequest);
    };

    vm.onSuccessSendNetworkRequest = function(response) {
      if (response.status === 201) {
        CustomAlertService.alert('Request sent for new connection');
        $timeout(function () {
          $state.go('employer.myConnection');
        }, 3000);
      }
      else {
        CustomAlertService.alert('Something went wrong.');
      }
    };

    vm.onErrorSendNetworkRequest = function() {

    };

    vm.onSearchSubmit = function (){
      EmployerServices.searchEmployer(employerId, vm.searchEmployer, vm.onSuccessSearch, vm.onErrorSearch);
    };

    vm.onSuccessSearch = function(response) {
      vm.result = response.data;
    };

    vm.redirectToEmployer = function(connection) {
      $state.go('employer.connectionDetails',{'connectionId': connection.employerId});
    };

    vm.initialize();
  }]);
})();
