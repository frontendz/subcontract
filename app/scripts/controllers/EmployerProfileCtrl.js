(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerProfileCtrl', ['$scope', '$state', 'EmployerServices', 'UserMetaDataService', 'AuthService','$rootScope','$timeout', '_', 'CustomAlertService',
    function($scope, $state, EmployerServices, UserMetaDataService, AuthService, $rootScope, $timeout, _, CustomAlertService) {
    var vm = this;
    var employerId = AuthService.getEmployerId();
    var userId = AuthService.getUserId();
    $rootScope.user = UserMetaDataService.getEmployerName();

    vm.CertificateListModel = [];

    vm.onSuccessAllLookupData = function (response) {
      vm.lookupData = response.data;
      vm.industryType = vm.lookupData.IndustryType;
      vm.certificateList = vm.lookupData.Certification;

      var iType = _.findIndex(vm.industryType, {'displayTitle' : 'Information Technology and Services' });
      iType > -1 ? vm.selectedIndustryType = vm.industryType[iType] : '';
    };
    vm.ErrorAllLookupData = function (response) {
    };

    EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);

    vm.onProfileFormSubmit = function() {
      vm.submitted = true;
      if (vm.CertificateListModel.length) {
        vm.certificateIds =_.pluck(vm.CertificateListModel, 'id');
      }
      var requestParams = {
        'industryType': vm.selectedIndustryType.displayTitle,
        'location': vm.location,
        'website': vm.website,
        'contactNo': String(vm.contactNumber),
        'contactName' : vm.contactName,
        'directLineNo': vm.directLineNo,
        'directLineExtn': vm.directLineExtn,
        'certifications' : vm.certificateIds,
      };
      EmployerServices.setBasicEmployerProfile(requestParams, userId,  vm.onSetEmployerBasicProfileSuccess, vm.onSetEmployerBasicProfileError);
    };

    vm.onSetEmployerBasicProfileSuccess = function(response) {
      CustomAlertService.alert('Congrats ! Registration successful. Please check your email to continue.')
      $timeout(function () {
          $state.go('home');
      }, 2500);
    };

    vm.onSetEmployerBasicProfileError = function(response) {
    };
  }]);
})();
