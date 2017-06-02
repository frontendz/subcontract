(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('TermsAndConditionsCtrl', ['$scope', '$uibModalInstance',
    function ($scope, $uibModalInstance) {

    $scope.close = function() {
      $uibModalInstance.close();
    };
  }]);
})();
