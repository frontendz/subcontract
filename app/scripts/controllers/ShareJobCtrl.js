(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('ShareJobCtrl', ['$scope', '$state', '$stateParams', 'EmployerServices', 'AuthService', '$uibModalInstance', 'item', 'CustomAlertService',
      function ($scope, $state, $stateParams, EmployerServices, AuthService, $uibModalInstance, item, CustomAlertService) {
        function onSuccessShareJob() {
          $uibModalInstance.close();
          CustomAlertService.alert('This job has been successfully shared.');
        }

        function onErrorShareJob() {

        }

        $scope.shareJobToFriend  = function() {
          EmployerServices.shareJob(item.jobId, $scope.email, onSuccessShareJob, onErrorShareJob);
        };

        $scope.close = function() {
          $uibModalInstance.close();
        };
      }]);
})();
