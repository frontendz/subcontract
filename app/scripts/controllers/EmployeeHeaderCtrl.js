(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployeeHeaderCtrl', ['$scope', '$state', 'AuthService', function ($scope, $state, AuthService) {
    var vm = this;
    vm.initialize = function() {
      vm.employeeName = AuthService.getEmployeeName();
    }
    vm.searchData = function () {
      $state.go('employee.search',{'query': vm.searchQuery});
      vm.searchQuery = '';
    };

    vm.onSuccessLogout = function(response) {
      var result = response;
      if (result && result.status === 200) {
        AuthService.clearUserData();
        AuthService.clearToken();
        $state.go('home');
      }
      else {

      }
    };
    vm.onErrorLogout = function(response) {
    };
    vm.logout = function () {
      AuthService.logout(vm.onSuccessLogout, vm.onErrorLogout);
    };
    vm.initialize();
  }]);
})();
