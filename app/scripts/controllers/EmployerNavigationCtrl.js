(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployerNavigationCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }]);
})();
