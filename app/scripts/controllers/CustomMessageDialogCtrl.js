(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('CustomMessageDialogCtrl', ['$scope', '$uibModalInstance', 'item',
      function ($scope, $uibModalInstance,item) {
        $scope.message = item;
        $scope.close = function() {
          $uibModalInstance.close();
        };

    }]);
})();