(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerYouMayKnowCtrl', ['$state', 'EmployerServices', 'UserMetaDataService', 'AuthService', function ($state, EmployerServices, UserMetaDataService, AuthService) {
    var vm = this;
    var employerId = AuthService.getEmployerId();

    vm.initialize = function() {
      vm.myAvailableConnection = false;
      vm.requestParams = {};
      EmployerServices.getAllEmployerDomainWise(employerId, 'all', vm.onSuccessYouMay, vm.onErrorYouMay);
    };

    vm.onSuccessYouMay = function(response) {
      vm.result = response.data;
    };
    vm.onErrorYouMay = function(response) {
    };

    vm.connectToEmployer = function(requestId) {
      vm.requestParams = {
        'requestedTo' : requestId.employerId
      };
      EmployerServices.sendNetworkRequest(employerId, vm.requestParams, vm.onSuccessSendNetworkRequest, vm.onErrorSendNetworkRequest);
    };

    vm.onSuccessSendNetworkRequest = function() {
      $state.go('employer.myConnection');
    };

    vm.onErrorSendNetworkRequest = function() {

    };

    vm.redirectToEmployer = function(connection) {
      $state.go('employer.connectionDetails',{'connectionId': connection.employerId});
    };

    vm.initialize();
  }]);
})();
