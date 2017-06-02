(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ForgotPasswordCtrl', ['$scope', 'CustomAlertService', '$state', '$rootScope', '$timeout', 'AuthService',
    function ($scope, CustomAlertService, $state, $rootScope, $timeout, AuthService){
    $scope.errorMsg = '';
      $scope.emailError = false;

    $scope.onSuccessEmail = function(response) {
      var result = response;
      if (result && result.status === 200) {
         CustomAlertService.alert('We have send you an email. Please check your inbox.');
         $timeout(function() {
           $state.go('home');
         }, 3000);
      }
      else
      {
        if (result.data.errorMsg !== undefined)
        CustomAlertService.alert(result.data.errorMsg);
      }
    };

    $scope.onErrorEmail = function(response) {
      //bad request
      var result = response;
      if(result && response.status === 400){
        $scope.emailError = true;
        $timeout(function () {
          $scope.emailError = false;
        }, 2500);
      }
    };

    $scope.onForgotpasswordFormSubmit = function(){
        var requestParams = {
          'email': $scope.email,
          'mobile': $scope.mobile
        };
        AuthService.forgotPassword(requestParams, $scope.onSuccessEmail, $scope.onErrorEmail);
    };
  }]);
})();
