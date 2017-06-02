(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerRegisterationCtrl', ['$scope', '$state', 'EmployerServices', 'UserMetaDataService', 'AuthService', '$stateParams', '$location', '$uibModal', '$rootScope', 'CustomAlertService',
    function($scope, $state, EmployerServices, UserMetaDataService, AuthService, $stateParams, $location, $uibModal, $rootScope, CustomAlertService) {
    $scope.isShowEmailExist = 'ng-hide';
    $scope.emailExist = '';

    var inviteQueryString = $location.search();
    var inviteFriendToken = inviteQueryString.token;

    $scope.onRegisterFormSubmit = function() {
      //if ($scope.termCondition.value === true) {
        $scope.submitted = true;

        if ($scope.isShowEmailExist === 'ng-hide') {
          var requestParams = {
            'email': $scope.email,
            'password': $scope.password,
            'name': $scope.company
          };

          if (inviteFriendToken !== undefined) {
            EmployerServices.setEmployerWithInvitation(requestParams, inviteFriendToken, $scope.onSetEmployerRegistrationSuccess, $scope.onSetEmployerRegistrationError);
          }
          else {
            EmployerServices.setEmployer(requestParams, $scope.onSetEmployerRegistrationSuccess, $scope.onSetEmployerRegistrationError);
          }
        }
        else {
          CustomAlertService.alert('User Already exist');
        }
    };
    function onSuccessLogin(response) {
      $scope.loginResponse = response.data;
      AuthService.storeUserInformation($scope.loginResponse);

      if ($scope.loginResponse.status === 400) {

      }
      else {
        if (response.status === 202) {
          $rootScope.user = $scope.loginResponse.employerName;
          AuthService.storeUserInformation($scope.loginResponse);
          $state.go('employerTempProfile');
        }
      }
    }

    function onErrorLogin() {

    }

    $scope.onSetEmployerRegistrationSuccess = function(response) {

      if (response.status === 400) {
        CustomAlertService.alert(response.data[0].errorMsg);
      }
      else {
        var result = response.data;
        if (result !== null) {
          var requestParams = {
            'username': $scope.email,
            'password': $scope.password,
          };
          AuthService.loginService(requestParams, onSuccessLogin, onErrorLogin);
        }
      }
    };

    $scope.onSetEmployerRegistrationError = function() {
    };

    $scope.checkUser = function() {
      var requestParams = {
        'email': $scope.email
      };
      EmployerServices.checkUserByEmail(requestParams, $scope.onSuccessCheckUser, $scope.onErrorCheckUser);
    };

    $scope.onSuccessCheckUser = function (response) {
      if (response.data === true) {
        $scope.isShowEmailExist = 'ng-show';
        $scope.emailExist = 'User already exist.';
      }
      else  {
        $scope.isShowEmailExist = 'ng-hide';
        $scope.emailExist = '';
      }
    };

    $scope.onErrorCheckUser= function() {
    };

    $scope.openTermsConditionPopup = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/public/termsAndConditions.html',
        size: 'lg',
        controller: 'TermsAndConditionsCtrl',
        windowClass: 'termsConditionsWindow'
      });
    };
  }]);
})();
