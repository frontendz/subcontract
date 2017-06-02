(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeRegistrationCtrl', ['$scope', '$state', 'EmployeeServices', 'AuthService', '$uibModal', '$rootScope', '$window', 'EmployerServices', 'moment', 'CustomAlertService',
        function($scope, $state, EmployeeServices, AuthService, $uibModal, $rootScope, $window, EmployerServices, moment, CustomAlertService) {
        var vm = this;
        vm.initialize = function() {
          vm.isShowEmailExist = 'ng-hide';
          vm.emailExist = '';

          var d = new Date();
          d.setFullYear(d.getFullYear() - 18);
          vm.candidateData = {};
          vm.today = function() {
            vm.dt = d;
          };

          vm.today();
          vm.clear = function() {
            vm.dt = null;
          };
          vm.dateOptions = {
            formatYear: 'yyyy',
            minDate: new Date('1-1-1931'),
            maxDate: new Date(),
            startingDay: 1
          };
          vm.open1 = function() {
            vm.popup1.opened = true;
          };
          vm.popup1 = {
            opened: false
          };
        };

        vm.doSomething = function () {
          vm.$selection_made = $item;
        };
        vm.onRegisterFormSubmit = function() {
          $scope.submitted = true;
          // if (isValid) {

          if (vm.isShowEmailExist === 'ng-hide') {
            var requestParams = {
              'firstName' : vm.firstName,
              'lastName' : vm.lastName,
              'password': vm.password,
              'mobileNo': vm.mobile,
              'email': vm.email,
              'dateOfBirth': moment(vm.dt).format('YYYYMMDD'),
            };
            EmployeeServices.setEmployee(requestParams, vm.onSetEmployeeRegistrationSuccess, vm.onSetEmployeeRegistrationError);
          }
          else {
            CustomAlertService.alert('User Already exist');
          }
        };

        function onSuccessLogin(response) {
          $scope.loginResponse = response.data;
          AuthService.storeUserInformation($scope.loginResponse);

          if (response.status === 202) {
            $rootScope.user = $scope.loginResponse.firstName;
            AuthService.storeUserInformation($scope.loginResponse);
            $state.go('employeeCandidateProfile', {
              'candidateData' : $scope.loginResponse.candidateId
            });
          }
        }

        function onErrorLogin() {

        }
        vm.onSetEmployeeRegistrationSuccess = function(response) {
          var result = response.data;
          if (result !== null) {
            var requestParams = {
              'username': vm.email,
              'password': vm.password,
            };
            AuthService.loginService(requestParams, onSuccessLogin, onErrorLogin);
          }
        };

        vm.onSetEmployeeRegistrationError = function() {

        };


        vm.checkUser = function() {
          var requestParams = {
            'email': vm.email
          };
          EmployerServices.checkUserByEmail(requestParams, vm.onSuccessCheckUser, vm.onErrorCheckUser);
        };

        vm.onSuccessCheckUser = function (response) {
          if (response.data === true) {
            vm.isShowEmailExist = 'ng-show';
            vm.emailExist = 'User already exist.';
          }
          else  {
            vm.isShowEmailExist = 'ng-hide';
            vm.emailExist = '';
          }
        };

        vm.onErrorCheckUser= function() {
        };

        vm.openTermsConditionPopup = function() {
          var modalInstance = $uibModal.open({
            templateUrl: 'views/public/termsAndConditions.html',
            size: 'lg',
            controller: 'TermsAndConditionsCtrl',
            windowClass: 'termsConditionsWindow'
          });
        };
        vm.initialize();
      }]);
})();
