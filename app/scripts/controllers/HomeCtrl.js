(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('HomeCtrl', ['$scope', '$state', '$uibModal', function ($scope, $state, $uibModal) {
    $('#mydiv').hide();
    var vm = this;
    vm.initialize = function() {
      vm.searchStr = '';
    };

    vm.myInterval = 3000;
    vm.noWrapSlides = false;
    vm.recruiterSignup = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('employerRegisteration');
    };

    vm.consultantSignup = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('employeeRegisteration');
    };

    vm.onSearchSubmit = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('homeSearch', {'query' : vm.searchStr });
    };

    vm.askForDemo = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('askForDemo');
    };

    vm.openLoginPopup = function(jobData) {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }

      var modalInstance = $uibModal.open({
        templateUrl: 'views/public/loginForm.html',
        controller: 'LoginPopupCtrl',
        size: 'sm',
        windowClass: 'LoginFormWindow'
      });

      //angular.element('.fm-button').triggerHandler('click');
    };

    vm.redirectToAboutUs = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('about');
    }

    vm.redirectToRAP = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('feedback');
    }

    vm.openTermsConditionPopup = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }

      var modalInstance = $uibModal.open({
        templateUrl: 'views/public/termsAndConditions.html',
        size: 'lg',
        controller: 'TermsAndConditionsCtrl',
        windowClass: 'termsConditionsWindow'
      });
    }

    vm.redirectToLoginPage = function() {
      $state.go('login');
    }

    vm.redirectToContactUs = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('contact');
    }

    vm.redirectToPP = function() {
      if (angular.element('header').css('left') === '240px') {
        angular.element('.fm-button').triggerHandler('click');
      }
      $state.go('privacy');
    }
    vm.initialize();

  }]);
})();
