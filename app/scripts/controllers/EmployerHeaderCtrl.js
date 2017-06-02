(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerHeaderCtrl', ['$scope', '$state', 'AuthService', '$uibModal', function ($scope, $state, AuthService, $uibModal) {
    var vm = this;

    vm.initialize = function() {
      vm.employerName = AuthService.getEmployerName();
    }
    vm.searchData = function () {
      $state.go('employer.search',{'query': vm.searchQuery});
      vm.searchQuery = '';
    };

    vm.inviteFriend = function(jobData) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/public/inviteFriendForm.html',
        controller: 'InviteFriendCtrl',
        resolve: {
          item: function() {
            return {
              'userType' : 'EMPLOYER',
              'employerId' : AuthService.getEmployerId()
            }
          }
        },
        size: 'sm'
      });
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
