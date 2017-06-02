(function() {
'use strict';
angular.module('scApp.controllers')
  .controller('InviteTeamCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', 'CustomAlertService', '$timeout',
    function ($scope, $state, EmployerServices, AuthService, CustomAlertService, $timeout) {
      var vm = this;
      var requestParams = {};
      vm.isShowEmailExist = 'ng-hide';
      vm.emailExist = '';

      vm.initialize = function (){
        var employerId = AuthService.getEmployerId();
        EmployerServices.viewTeamMembers(employerId, vm.onGetViewTeamSuccess, vm.onGetViewTeamError);
      };
      vm.onGetViewTeamSuccess = function(response){
        vm.teamMemberList = response.data;
      };
      vm.onGetViewTeamError = function(){
      };

      vm.checkEmail = function() {
        if (vm.teamMemberList.length) {
          var ind = _.findIndex(vm.teamMemberList, {'email': vm.email});
          if (ind > -1) {
            vm.isShowEmailExist = 'ng-show';
            vm.emailExist = 'Email already exist.';
          }
          else  {
            vm.isShowEmailExist = 'ng-hide';
            vm.emailExist = '';
          }
        }
        else {
          vm.isShowEmailExist = 'ng-hide';
          vm.emailExist = '';
        }
      };

      vm.addInviteTeam = function(){
        if (vm.isShowEmailExist === 'ng-hide') {
          vm.requestParams = {
            'firstName' : vm.firstName,
            'lastName' : vm.lastName,
            'email' : vm.email,
            'mobile' : vm.mobileNumber,
            'password' : vm.password,
          };

          var employerId = AuthService.getEmployerId();
          EmployerServices.addInviteTeam(employerId, vm.requestParams, vm.onAddInviteMembersSuccess, vm.onAddInviteMembersError );
        }
        else {
          CustomAlertService.alert('Email Already exist');
        }
      };

      vm.onAddInviteMembersSuccess = function(response){
        if (response.status === 201) {
          CustomAlertService.alert('Team member added successfully');
          $timeout(function () {
            $state.go('employer.viewTeam');
          }, 3000);
        }
        else {
          CustomAlertService.alert('Something went wrong, Please try again');
        }
      };
      vm.onAddInviteMembersError = function(){
        CustomAlertService.alert('Something went wrong, Please try again');
      };

      vm.initialize();
  }]);
})();
