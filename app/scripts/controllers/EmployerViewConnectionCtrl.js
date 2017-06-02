(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerViewConnection', ['$state', 'EmployerServices', 'AuthService', '$stateParams', 'CustomAlertService', '$timeout',
      function ($state, EmployerServices, AuthService, $stateParams, CustomAlertService, $timeout) {
      var vm = this;
      vm.connectionId = $stateParams.connectionId;
      vm.jobs = [];
      vm.loggedInEmployerId = '';

      vm.initialize = function() {
        vm.loggedInEmployerId = AuthService.getEmployerId();
        EmployerServices.getEmployerAllDetail(vm.connectionId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
      };

      vm.onSuccessMyConnectedNetwork = function(response) {
        vm.currentConnection = response.data;
        EmployerServices.getJobsByEmployer(vm.connectionId, onSuccess, onError);
      };

      vm.onErrorMyConnectedNetwork = function() {
      };

      function onSuccessTrusted() {
        EmployerServices.getEmployerAllDetail(vm.connectionId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
      }

      function onErrorTrusted() {

      }

      vm.connect = function() {
        vm.requestParams = {
          'requestedTo' : vm.connectionId
        };
        EmployerServices.sendNetworkRequest(vm.loggedInEmployerId, vm.requestParams, vm.onSuccessSendNetworkRequest, vm.onErrorSendNetworkRequest);
      };

      vm.cancelRequest = function() {

      }

      vm.onSuccessSendNetworkRequest = function(response) {
        if (response.status === 201) {
          CustomAlertService.alert('Request sent for new connection');
          $timeout(function() {
            $state.go('employer.myConnection');
          }, 3000);
        }
        else {
          CustomAlertService.alert('Something went wrong, try again');
        }
      };

      vm.onErrorSendNetworkRequest = function() {

      };

      vm.onSuccessCancelNetworkRequest = function(response) {
        if (response.status === 200) {
          CustomAlertService.alert('Sent Request cancelled.')
          $timeout(function() {
            $state.go('employer.myConnection');
          }, 3000);
        }
      };

      vm.onErrorCancelNetworkRequest = function(response) {
      };

      vm.cancelRequest = function(employerDetail) {
        vm.deletionEmployer = employerDetail;
        EmployerServices.cancelNetworkRequest(vm.loggedInEmployerId, vm.currentConnection.employerNetworkId, vm.onSuccessCancelNetworkRequest, vm.onErrorCancelNetworkRequest);
      };

      function onSuccessDisconnect(response) {
        if (response.status === 200) {
          CustomAlertService.alert('Employer is disconnected successfully.');
          $timeout(function() {
            $state.go('employer.myConnection');
          }, 3000);
        }
      }

      function onErrorDisconnect() {}

      vm.addTrusted = function() {
        EmployerServices.connectionWithEmployer(vm.loggedInEmployerId, vm.currentConnection.employerNetworkId, 'add', $stateParams.connectionId, onSuccessTrusted, onErrorTrusted);
      };
      vm.disconnect = function() {
        EmployerServices.connectionDisconnect(vm.loggedInEmployerId, vm.currentConnection.employerNetworkId, 'disconnect', $stateParams.connectionId, onSuccessDisconnect, onErrorDisconnect);
      };
      vm.acceptTrust = function() {
        EmployerServices.connectionWithEmployer(vm.loggedInEmployerId, vm.currentConnection.employerNetworkId, 'accept', $stateParams.connectionId, onSuccessTrusted, onErrorTrusted);
      };
      vm.delTrust = function() {
        EmployerServices.connectionWithEmployer(vm.loggedInEmployerId, vm.currentConnection.employerNetworkId, 'delete', $stateParams.connectionId, onSuccessTrusted, onErrorTrusted);
      };
      vm.cancelTrust = function() {
        EmployerServices.connectionWithEmployer(vm.loggedInEmployerId, vm.currentConnection.employerNetworkId, 'cancel', $stateParams.connectionId, onSuccessTrusted, onErrorTrusted);
      };

      vm.viewJob = function(jobData, view) {
        $state.go('employer.viewJob', {
          'jobId': jobData.jobId,
          'userType': 'Employer',
          'viewFrom': view
        });
      };

      function onSuccess(response) {
        vm.jobs = response.data;
      }

      function onError() {
      }

      vm.switchTab = function (view) {
        $('.active').removeClass('active');
        $('#' + view).addClass('active');
      };

      vm.initialize();
    }]);
})();
