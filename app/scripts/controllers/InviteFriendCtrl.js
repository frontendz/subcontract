(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('InviteFriendCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'AuthService', '$uibModalInstance', 'item', 'CustomAlertService',
      function ($scope, $state, $stateParams, EmployerServices, AuthService, $uibModalInstance, item, CustomAlertService) {

        function onSuccess() {
          $uibModalInstance.close();
          CustomAlertService.alert('Your invite has been shared successfully');
        }

        function onError() {

        }

        $scope.inviteFriend = function() {
          var requestParams = {
            'friendName' : $scope.friendName,
            'email' : $scope.friendEmail
          };

          EmployerServices.inviteFriend(requestParams, onSuccess, onError);
        };



        $scope.close = function() {
          $uibModalInstance.close();
        };

      }]);
})();
