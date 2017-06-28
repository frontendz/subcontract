(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerFullProfileCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '_', function($scope, $state, EmployerServices, AuthService, _) {
    var vm = this;
    var userId = AuthService.getUserId();

    vm.editQuestionInfo = false;
    vm.questions = [];

    vm.open1 = function() {
       vm.opened = true;
    };

    vm.initialize = function() {
      vm.employerId = AuthService.getEmployerId();
      vm.today = function() {
          vm.dt = new Date();
      };
      vm.today();
      vm.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(),
        minDate: new Date('01-01-1931')
      };
      vm.editCompanyInfo = false;
      vm.editSocialInfo = false;
      vm.editExpertiseInfo = false;
      vm.certificateList = [];
      vm.certificateListModel = [];
      vm.certificateSettings = {closeOnSelect: true, closeOnDeselect: true, buttonClasses: 'customDropdownBtn', dynamicTitle: true, externalIdProp: '', displayProp: 'displayTitle', idProp: 'masterId', scrollable: false};
      vm.certificateCustomText = {buttonDefaultText: 'Certificate'};

      EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);
      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.onSuccessAllLookupData = function (response) {
      vm.lookupData = response.data;
      vm.certificateList = vm.lookupData.Certification;
    };
    vm.onErrorAllLookupData = function (response) {
    };

    vm.onSuccessGetEmployerAllDetail = function(response) {
      vm.result = response.data;
    };

    vm.onErrorGetEmployerAllDetail = function(response) {
    };

    vm.onProfileFormSubmit = function() {
      console.log(vm.certificateListModel);
      if (vm.certificateListModel.length) {
        vm.certificateIds =_.pluck(vm.certificateListModel, 'masterId');
      }
      else {
        vm.certificateIds = [];
      }
      var estDate = ''
      if (vm.result.establishedAt !== undefined) {
        estDate = moment(vm.result.establishedAt).format('YYYYMMDD');
      }
      var requestParams = {
        'name': vm.result.name,
        'industryType': vm.result.industryType,
        'location': vm.result.location,
        'website': vm.result.website,
        'contactNumber': vm.result.contactNumber,
        'directLineNo': vm.result.directLineNo,
        'directLineExtn': vm.result.directLineExtn,
        'certifications' : vm.certificateIds,
        'address': vm.result.address,
        'aboutCompany': vm.result.aboutCompany,
        'establishedAt': estDate,
        'revenue': vm.result.revenue,
        'employeeCount': vm.result.employeeCount,
        'service': vm.result.service,
        'expert': vm.result.expert,
        'majorClient': vm.result.majorClient,
        'facebook': vm.result.facebook,
        'twitter': vm.result.twitter,
        'linkedIn': vm.result.linkedIn,
        'googlePlus': vm.result.googlePlus
      };
      EmployerServices.setFullEmployerProfile(requestParams, vm.employerId,  vm.onSetEmployerFullProfileSuccess, vm.onSetEmployerFullProfileError);
    };

    vm.onSetEmployerFullProfileSuccess = function() {
      vm.editCompanyInfo = false;
      vm.editSocialInfo = false;
      vm.editExpertiseInfo = false;

      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.onSetEmployerFullProfileError = function(response) {
    };

    vm.editExpertiseInfoBtn = function() {
      vm.editExpertiseInfo = true;
    };

    vm.cancelExpertiseInfo = function() {
      vm.editExpertiseInfo = false;
      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.editSocialInfoBtn = function() {
      vm.editSocialInfo = true;
    };

    vm.cancelSocialInfo = function() {
      vm.editSocialInfo = false;
      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.editCompanyInfoBtn = function() {
      vm.editCompanyInfo = true;
    };

    vm.cancelCompanyInfo = function() {
      vm.editCompanyInfo = false;
      EmployerServices.getEmployerAllDetail(vm.employerId, vm.onSuccessGetEmployerAllDetail, vm.onErrorGetEmployerAllDetail);
    };

    vm.getQuestions = function(){
      EmployerServices.getAllQuestions(vm.onSuccessGetAllQuestions, vm.onErrorGetAllQuestions);
    };

    vm.onSuccessGetAllQuestions = function(response){
        vm.questions = response.data;
    };

    vm.onErrorGetAllQuestions = function(response){
        console.log("error block");
    };

    vm.editQuestionInfoBtn = function(){
      vm.editQuestionInfo = true;
    };

    vm.cancelQuestionInfo = function(){
      vm.editQuestionInfo = false;
    };

    vm.onQuestionFormSubmit = function() {
      //console.log(vm.questionData);
      vm.requestParams = [
              {
                "questionId": vm.questionData.firstQues.questionId,
                "answer": vm.questionData.firstAnswer
              },
              {
                "questionId": vm.questionData.secondQues.questionId,
                "answer": vm.questionData.secondAnswer
              },
              {
                "questionId": vm.questionData.thirdQues.questionId,
                "answer": vm.questionData.thirdAnswer
              }
            ];
            EmployerServices.saveAllQuestions(vm.requestParams, userId, vm.onSuccessSaveAllQuestions, vm.onErrorSaveQuestions);
    };

    vm.onSuccessSaveAllQuestions = function(response){
      console.log(response);
    };

    vm.onErrorSaveQuestions = function(response){
      console.log(response);
    };

    vm.switchTab = function (view) {
      $('.active').removeClass('active');
      $('#' + view).addClass('active');
      //getJobs(view);
    };

    vm.initialize();
    vm.getQuestions();

  }]);
})();
