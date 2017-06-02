(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('AskForDemoCtrl', ['$scope', '$window', '$state', '$rootScope', '$timeout', 'AuthService', '$stateParams', '$location', 'CustomAlertService',
    function ($scope, $window, $state, $rootScope, $timeout, AuthService, $stateParams, $location, CustomAlertService){
    var vm = this;

    $rootScope.alerts = [];
    $rootScope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };


    function onSuccessDemo(response) {
      CustomAlertService.alert('Thank you, we have received your request.');
      $state.go('home');
    }
    function onErrorDemo() {

    }
    vm.registerDemo = function(askForDemoForm) {
      vm.submitted = true;
      var requestParams = {
        'name' : vm.name,
        'emailid' : vm.email,
        'phoneNo' : vm.mobile
      }
      if (askForDemoForm.$valid) {
        AuthService.askForDemo(requestParams, onSuccessDemo, onErrorDemo);
      }
    };
  }]);
})();
