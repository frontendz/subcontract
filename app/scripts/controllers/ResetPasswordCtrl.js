(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ResetPasswordCtrl', ['$scope', 'CustomAlertService', '$state', '$rootScope', '$timeout', 'AuthService', '$stateParams', '$location', function ($scope, CustomAlertService, $state, $rootScope, $timeout, AuthService, $stateParams, $location){
    var search = $location.search();
    var token = search.token;

    $scope.errorMsg = '';
    $scope.onSuccessEmail = function(response) {
      var result = response;
      if (result && result.status === 200) {
        CustomAlertService.alert('password reset successfully. Login with new credentials');
        $timeout(function () {
          $state.go('home');
        }, 2500);
      }
      else
      {
        CustomAlertService.alert('Sorry, something went wrong.');
      }
    };

    $scope.onErrorEmail = function() {
    };

    $scope.onResetPasswordFormSubmit = function() {
        var requestParams = {
          'password': $scope.newPassword
        };
        AuthService.resetPassword(requestParams, token, $scope.onSuccessEmail, $scope.onErrorEmail);
    };

  }]);
})();
