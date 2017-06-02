(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('ViewTeamCtrl', ['$scope','$uibModal','AuthService','EmployerServices', '$state',
    function ($scope, $uibModal, AuthService, EmployerServices, $state) {
      var vm = this ;
      vm.initialize = function (){
        var employerId = AuthService.getEmployerId();
        EmployerServices.viewTeamMembers(employerId, vm.onGetViewTeamSuccess, vm.onGetViewTeamError);
      };
      vm.onGetViewTeamSuccess = function(response){
        vm.result = response.data;
      };
      vm.onGetViewTeamError = function(){
      };

      vm.inviteTeam = function() {
        $state.go('employer.inviteTeam');
      };

      $scope.animationsEnabled = true;
      vm.editTeamMembersFun = function (teamData) {
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/employer/editTeamMembers.html',
          controller: 'EditTeamMembersCtrl as editTeamMembersCtrl',
          size: 'lg',
          windowClass : 'view-job-window',
          backdropClass : 'view-job-window-backdrop',
          resolve: {
            teamDataItems: function () {
              return teamData;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
        });
      };

      vm.viewJobsByRecruiter = function(teamData) {
        $state.go('employer.jobsByRecruiter', {
          'teamMemberId': teamData.id
        });
      };

      vm.teamMemberChangePasswordFun = function(teamData){
        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'views/employer/teamMembersChangePassword.html',
          controller: 'TeamMembersChangePassCtrl as teamMembersChangePassCtrl',
          size: 'lg',
          windowClass : 'view-job-window',
          backdropClass : 'view-job-window-backdrop',
          resolve: {
            teamDataItems: function () {
              return teamData;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
        });
      };
      vm.initialize();
  }])
  .controller('EditTeamMembersCtrl', ['$uibModalInstance', 'teamDataItems', 'EmployerServices', 'AuthService',
    function($uibModalInstance, teamDataItems, EmployerServices, AuthService){
      var vm = this;
      vm.initialize = function() {
          vm.defaultTeamMember = teamDataItems;
      };

      vm.updateTeamMembers = function(isValid){
        vm.submitted = true;
        vm.requestParams = {
          'firstName' : vm.defaultTeamMember.firstName,
          'lastName' : vm.defaultTeamMember.lastName,
          'email' :vm.defaultTeamMember.email,
          'mobile' : vm.defaultTeamMember.mobile
        };
        EmployerServices.editTeamMembersDetail(AuthService.getEmployerId(), vm.defaultTeamMember.id, vm.requestParams, vm.onUpdateTeamMembersSuccess, vm.onUpdateTeamMembersError);
      };

      vm.onUpdateTeamMembersSuccess = function(){
        $uibModalInstance.dismiss('cancel');
      };
      vm.onUpdateTeamMembersError =function () {
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.initialize();
  }])
  .controller('TeamMembersChangePassCtrl', ['$uibModalInstance', 'teamDataItems', 'EmployerServices', 'AuthService', '$scope', 'CustomAlertService',
    function($uibModalInstance, teamDataItems, EmployerServices, AuthService, $scope, CustomAlertService){
      var vm = this;
      vm.initialize = function() {
          vm.defaultTeamMember = teamDataItems;
      };

      vm.onSuccessUpdatePassword = function(response){
        if (response.status === 200) {
          CustomAlertService.alert('Password changed successfully.');
          $uibModalInstance.dismiss('cancel');
        }
        else {
          CustomAlertService.alert('Sorry, Something went wrong.');
          $uibModalInstance.dismiss('cancel');
        }
      };
      vm.onErrorUpdatePassword =function () {
      };

      vm.updatePassword = function(){
        vm.submitted = true;
        vm.requestParams = {
          'password' : vm.defaultTeamMember.password,
        };
        EmployerServices.changeTeamMemberPassword(AuthService.getEmployerId(), vm.defaultTeamMember.id, vm.requestParams, vm.onSuccessUpdatePassword, vm.onErrorUpdatePassword);
      };

      vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
      };

      vm.initialize();
  }]);
})();
