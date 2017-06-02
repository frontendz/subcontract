(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('FeedbackCtrl', ['$scope', 'EmployerServices', '$window', '$state', 'CustomAlertService', '$timeout',
    function ($scope, EmployerServices, $window, $state, CustomAlertService, $timeout){
      var vm = this;
      vm.SuccessFeedback = function(response) {
        if (response.status === 200) {
          CustomAlertService.alert('Thank you for your valuable feedback.');
          $timeout(function() {
            $state.go('home');
          }, 3000);
        }
      };

      vm.ErrorFeedback = function() {};

      vm.submitFeedback = function() {
        var fd = new FormData();
        if (vm.name !== undefined || vm.name !== null || vm.name !== '') {
          fd.append('name', vm.name);
        }
        if (vm.email !== undefined || vm.email !== null || vm.email !== '') {
          fd.append('email', vm.email);
        }
        if (vm.desc !== undefined || vm.desc !== null || vm.desc !== '') {
          fd.append('description', vm.desc);
        }
        if (vm.mobileNo !== undefined || vm.mobileNo !== null || vm.mobileNo !== '') {
          fd.append('mobile', vm.mobileNo);
        }
        if (vm.attachments !== undefined || vm.attachments !== null || vm.attachments !== '') {
          fd.append('file', vm.attachments);
        }

        EmployerServices.sendFeedback(fd, vm.SuccessFeedback,vm.ErrorFeedback);
      };
    }]);
})();
