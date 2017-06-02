(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeProfileCtrl', function($scope, $state) {
        var vm = this;
        vm.initialize = function() {
          vm.today = function() {
            vm.dt = new Date();
          };
          vm.today();
          vm.clear = function() {
            vm.dt = null;
          };
          vm.open1 = function() {
            vm.popup1.opened = true;
          };
          vm.popup1 = {
            opened: false
          };

        };

        vm.onRegisterFormSubmit = function(isValid) {
          $scope.submitted = true;
          if (isValid) {
            var requestParams = {
              'firstName' : vm.firstName,
              'lastName' : vm.lastName,
              'password': vm.password,
              'mobileNo': vm.mobile,
              'email': vm.email,
              'dateOfBirth': vm.dt
            };
            EmployeeServices.setEmployee(requestParams, vm.onSetEmployeeRegistrationSuccess, vm.onSetEmployeeRegistrationError);
          }
          else {
            
          }
        };

        vm.onSetEmployeeRegistrationSuccess = function(response) {
          var result = response.data;
            if (result !== null) {
            // UserMetaDataService.setEmployeeDetail(result);
            $state.go('employerTempProfile');
          }
        };

        vm.onSetEmployeeRegistrationError = function(response) {
        };

        vm.initialize();
      });
})();
