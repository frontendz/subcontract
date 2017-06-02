(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerChangePasswordCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', 'CustomAlertService', '$timeout',
    function ($scope, $state, EmployerServices, AuthService, CustomAlertService, $timeout) {
    function onSuccessPasswordChange(response) {
      if (response.status === 200) {
        CustomAlertService.alert('Password changed successfully.');
        $timeout(function() {
          $state.go('employer.dashboard');
        }, 3000);
      }
      else if (response.status === 400) {
        CustomAlertService.alert(response.data.errorMsg);
      }
    }
    function onErrorPasswordChange() {

    }
  	$scope.onChangePasswordFormSubmit = function(){
      var userId = AuthService.getUserId();
      EmployerServices.changeEmployerPassword($scope.currentPassword, $scope.newPassword, userId, onSuccessPasswordChange, onErrorPasswordChange);
  	};
  }]);
})();
