(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('ViewSingleJobCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'EmployerServices', 'EmployeeServices', 'AuthService', '$uibModal',
      function ($rootScope, $scope, $state, $stateParams, EmployerServices, EmployeeServices, AuthService, $uibModal) {
        var vm = this;

        vm.initialize = function() {
          var jobId = $stateParams.jobId;
          EmployerServices.getSingleJobDetail(jobId, onSuccess, onError);
        };

        function onSuccess(response) {
          vm.result = response.data;
        }

        function onError() {
        }
        vm.initialize();

        vm.onErrorAppliedJobs = function() {
        };

        vm.backToDashboard = function() {
          window.history.back();
        };

        vm.loginToApply = function() {
          $rootScope.sharedJob = {
            'jobId' : $stateParams.jobId,
            'employerId' : $stateParams.employerId,
          };


          var modalInstance = $uibModal.open({
            templateUrl: 'views/public/loginForm.html',
            controller: 'LoginPopupCtrl',
            size: 'sm',
            windowClass: 'LoginFormWindow'
          });

          // $state.go('home');
        };

        vm.shareJob = function(jobData) {
          var modalInstance = $uibModal.open({
            templateUrl: 'views/public/shareJob.html',
            controller: 'ShareJobCtrl',
            resolve: {
              item: function() {
                return jobData;
              }
            },
            size: 'lg'
          });
        };

      }]);
})();
