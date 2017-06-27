(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ForgotPasswordCtrl', ['$scope', 'CustomAlertService', '$state', '$rootScope', '$timeout', 'AuthService','EmployerServices',
    function ($scope, CustomAlertService, $state, $rootScope, $timeout, AuthService, EmployerServices){
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
        if($scope.resetOption === 'mobileNumber'){
            AuthService.forgotPassword(requestParams, $scope.onSuccessEmail, $scope.onErrorEmail);
        }
        else{
          angular.forEach($scope.securityQuestions, function(val){
            delete val.question
          });
          AuthService.checkSecurityQuestionsByEmail($scope.securityQuestions, $scope.email, $scope.onSuccessCheckSucurityQuestions, $scope.onErroCheckSecurity)
        }
    };

    $scope.onSuccessCheckSucurityQuestions = function(response){
      console.log(response);
    };

    $scope.onErroCheckSecurity = function(response){
      console.log(response);
    }

    $scope.getQuestions = function(){
      if($scope.email && $scope.resetOption ==='securityQuestion'){
        AuthService.getSecurityQuestionByEmail($scope.email, $scope.onSuccessSecurityQuestions, $scope.onErrorSecurityQuestions)
      };
    };

    $scope.onSuccessSecurityQuestions = function(response){
      console.log(response);
      $scope.securityQuestions = response.data;
    };

    $scope.onErrorSecurityQuestions = function(response){
      console.log(response);
    };

  }]);
})();
