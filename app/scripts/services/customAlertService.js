(function(){
  'use strict';
  angular.module('scApp.services')
    .factory('CustomAlertService', ['$uibModal', function($uibModal) {
      var globals;
      return{
        alert: function(message){
          var modalInstance = $uibModal.open({
            templateUrl: 'views/public/customMessageDialog.html',
            controller: 'CustomMessageDialogCtrl',
            windowClass: 'customAlertClass',
            backdropClass : 'customAlertBackdropClass',
            resolve: {
              item: function() {
                return message;
              }
            },
            size: 'sm'
          });
        }
      };
    }]);
})();
