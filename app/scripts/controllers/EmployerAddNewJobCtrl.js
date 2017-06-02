(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployerAddNewJobCtrl', ['$scope', '$location', '$state', '$timeout', '$stateParams', 'EmployerServices', 'AuthService', 'moment', '_', 'CustomAlertService',
        function($scope, $location, $state, $timeout, $stateParams, EmployerServices, AuthService, moment, _, CustomAlertService) {
        var vm = this;
        var lastValue = '';
        var timeout;
        vm.jobPostMode = '';
        vm.isAppSiteListShow = false;
        vm.searchResultNotFoundClass = 'HideElement';
        var employerId = '';

        vm.open1 = function() {
           vm.opened = true;
        };

        vm.initialize = function(){
          vm.noticePeriodList = [
            {
              'name' : 'Immediate',
              'value' : 'immediate'
            },
            {
              'name' : '7days',
              'value' : '7days'
            },
            {
              'name' : '14 Days',
              'value' : '14days'
            },
            {
              'name' : '30 Days',
              'value' : '30days'
            },
            {
              'name' : '60 Days',
              'value' : '60days'
            },
            {
              'name' : '90 Days',
              'value' : '90days'
            }
          ];

          vm.remoteList = [
            {
              'name' : 'Remote',
              'value' : 'remote'
            },
            {
              'name' : 'Partially Remote',
              'value' : 'partially remote'
            },
            {
              'name' : 'Onsite',
              'value' : 'onsite'
            },
            {
              'name' : 'NA',
              'value' : 'NA'
            }
          ];

          // initialize Dates'
          vm.today = function() {
              vm.dt = new Date();
          };
          vm.today();
          vm.dateOptions = {
            formatYear: 'yyyymmdd',
            startingDay: 1,
            minDate: new Date()
          };
          employerId = AuthService.getEmployerId();
          // Getting All Lookup Data
          EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);
          EmployerServices.viewTeamMembers(employerId, vm.onSuccessAllTeamMembers, vm.onErrorAllTeamMembers);
          vm.jobId = $stateParams.jobId;

          if (vm.jobId === null || vm.jobId === '' || vm.jobId === undefined) {
            vm.jobPostMode = 'NewMode';

            // var iType = _.findIndex(vm.industryType, {'displayTitle' : "Information Technology and Services" })
            // iType > -1 ? vm.jobDetailData.industry = vm.industryType[iType] : '';
            //
            // vm.jobDetailData.currency = vm.jobDetailData.currency[0];
          }
          else {
            vm.jobPostMode = 'EditMode';
            EmployerServices.viewParticularJob(employerId, vm.jobId, vm.onSuccessMyJobs, vm.onErrorMyJobs);
          }
        };

        vm.onSuccessMyJobs = function(response) {
          vm.jobDetailData = response.data;

          vm.jobDetailData.jobVisibility = vm.jobDetailData.visibility;
          // vm.jobDetailData.noticeInDays =
          vm.jobDetailData.jobLocation = vm.jobDetailData.location;
          vm.jobDetailData.JobID = vm.jobDetailData.jobId;
          vm.jobDetailData.jobKeywords = vm.jobDetailData.keywords;
          vm.jobDetailData.salaryRangeFrom =  vm.jobDetailData.salaryFrom;
          vm.jobDetailData.salaryRangeTo =  vm.jobDetailData.salaryTo;
          vm.jobDetailData.contractTerms = vm.jobDetailData.contractTerms;

          // Notice In
          var noticeDats = _.findIndex(vm.noticePeriodList, {'value' : vm.jobDetailData.noticeIn });
          noticeDats > -1 ? vm.jobDetailData.noticeInDays = vm.noticePeriodList[noticeDats] : '';

          // Remote Location
          var remoteLoc = _.findIndex(vm.remoteList, {'value' : vm.jobDetailData.remote });
          remoteLoc > -1 ? vm.jobDetailData.remote = vm.remoteList[remoteLoc] : '';

          // Refersh Time
          vm.jobDetailData.refreshJobBy = vm.jobDetailData.refreshJob;

          // Experience From & To
          vm.jobDetailData.txtExpFrom = vm.jobDetailData.expFrom;
          vm.jobDetailData.txtExpTo = vm.jobDetailData.expTo;
          vm.jobDetailData.jobSkills = vm.jobDetailData.skill;

          EmployerServices.getAllSkillsList('', vm.onSuccessSkillSearchEditMode, vm.onErrorSkillSearchEditMode);

          vm.jobDetailData.currency = vm.jobDetailData.currency;
          vm.jobDetailData.dt = new Date(vm.jobDetailData.closingAt);

          var recId = _.findIndex(vm.allTeamMember, {'id' : vm.jobDetailData.recruiterAssigned });
          recId > -1 ? vm.jobDetailData.recruiterAssigned = vm.allTeamMember[recId] : 'Self';

          vm.jobDetailData.noOfPositions = vm.jobDetailData.noOfPosition;
          vm.jobDetailData.endClientDesc = vm.jobDetailData.aboutCompany;

          var tType = _.findIndex(vm.travelType, {'displayTitle' : vm.jobDetailData.travelType });
          tType > -1 ? vm.jobDetailData.travelType = vm.travelType[tType] : '';

          var iType = _.findIndex(vm.industryType, {'displayTitle' : vm.jobDetailData.industry });
          iType > -1 ? vm.jobDetailData.industry = vm.industryType[iType] : '';

          var rType = _.findIndex(vm.rateType, {'displayTitle' : vm.jobDetailData.rateType });
          rType > -1 ? vm.jobDetailData.rateType = vm.rateType[rType] : '';

          var emType = _.findIndex(vm.employmentType, {'displayTitle' : vm.jobDetailData.employmentType });
          emType > -1 ? vm.jobDetailData.employmentType = vm.employmentType[emType] : '';

          var reqType = _.findIndex(vm.requirementType, {'displayTitle' : vm.jobDetailData.requirementType });
          reqType > -1 ? vm.jobDetailData.requirementType = vm.requirementType[reqType] : '';
        };

        vm.onErrorMyJobs = function() {

        };

        vm.onSuccessSkillSearchEditMode = function(response) {
          var result = response.data;
          var skArray = vm.jobDetailData.jobSkills.split(',');

          _.each(skArray, function(skill){
            var skillObj = _.findWhere(result, {'skillName': skill});
            vm.skillList.push(skillObj);
          });
        }

        vm.onErrorSkillSearchEditMode = function(response) {

        }

        vm.onSuccessAllLookupData = function (response) {
          vm.lookupData = response.data;
          vm.travelType = vm.lookupData.TravelType;
          vm.industryType = vm.lookupData.IndustryType;
          vm.rateType = vm.lookupData.RateType;
          vm.experienceType = vm.lookupData.Experience;
          vm.employmentType = vm.lookupData.EmploymentType;
          vm.requirementType = vm.lookupData.RequirementType;

          if (vm.jobPostMode === 'EditMode') {
            var tType = _.findIndex(vm.travelType, {'displayTitle' : vm.jobDetailData.travelType });
            tType > -1 ? vm.jobDetailData.travelType = vm.travelType[tType] : '';

            var iType = _.findIndex(vm.industryType, {'displayTitle' : vm.jobDetailData.industry });
            iType > -1 ? vm.jobDetailData.industry = vm.industryType[iType] : '';

            var rType = _.findIndex(vm.rateType, {'displayTitle' : vm.jobDetailData.rateType });
            rType > -1 ? vm.jobDetailData.rateType = vm.rateType[rType] : '';

            var emType = _.findIndex(vm.employmentType, {'displayTitle' : vm.jobDetailData.employmentType });
            emType > -1 ? vm.jobDetailData.employmentType = vm.employmentType[emType] : '';

            var reqType = _.findIndex(vm.requirementType, {'displayTitle' : vm.jobDetailData.requirementType });
            reqType > -1 ? vm.jobDetailData.requirementType = vm.requirementType[reqType] : '';
          }
          else {
            var iType = _.findIndex(vm.industryType, {'displayTitle' : 'Information Technology and Services' });
            iType > -1 ? vm.jobDetailData.industry = vm.industryType[iType] : '';
          }
        };
        vm.onSuccessAllTeamMembers = function(response) {
          vm.allTeamMember = response.data;

          if (vm.jobPostMode === 'EditMode') {
            var recId = _.findIndex(vm.allTeamMember, {'recruiterAssigned' : vm.jobDetailData.recruiterAssigned });
            recId > -1 ? vm.jobDetailData.recruiterAssigned = vm.allTeamMember[recId] : 'Self';
          }
        };
        vm.onErrorAllTeamMembers = function() {
        };
        vm.onErrorAllLookupData = function () {
        };

        vm.postNewJob = function() {
          var ct = '';
          if (vm.jobDetailData.contractTerms && vm.jobDetailData.contractTerms.length !== undefined) {
            if (Array.isArray(vm.jobDetailData.contractTerms)) {
              _.each(vm.jobDetailData.contractTerms, function(data) {
                ct += data + ',';
              });
              ct = ct.substring(0, ct.length - 1);
            }
            else {
              ct = vm.jobDetailData.contractTerms;
            }
          }
          var rmt = '';
          if (vm.jobDetailData.remote && vm.jobDetailData.remote.value !== undefined) {
            rmt = vm.jobDetailData.remote.value;
          }
          var recruiter = '';
          if (vm.jobDetailData.recruiterAssigned && vm.jobDetailData.recruiterAssigned.id !== undefined) {
            recruiter = vm.jobDetailData.recruiterAssigned.id;
          }

          var noticeDays = '';
          if (vm.jobDetailData.noticeInDays !== undefined) {
            noticeDays = vm.jobDetailData.noticeInDays.value;
          }

          var empTypeSave = '';
          if (vm.jobDetailData.employmentType !== undefined) {
            empTypeSave = vm.jobDetailData.employmentType.displayTitle;
          }

          var requirementType = '';
          if (vm.jobDetailData.requirementType !== undefined) {
            requirementType = vm.jobDetailData.requirementType.displayTitle;
          }

          var rateType = '';
          if (vm.jobDetailData.rateType !== undefined) {
            rateType = vm.jobDetailData.rateType.displayTitle;
          }

          var travelType = '';
          if (vm.jobDetailData.travelType !== undefined) {
            travelType = vm.jobDetailData.travelType.displayTitle;
          }

          var indus = '';
          if (vm.jobDetailData.industry !== undefined) {
            indus = vm.jobDetailData.industry.displayTitle;
          }

          vm.requestParams = {
            'jobTitle': vm.jobDetailData.jobTitle,
            'jobDesc': vm.jobDetailData.jobDesc,
            'location': vm.jobDetailData.jobLocation,
            'skill': vm.jobDetailData.jobSkills,
            'keywords': vm.jobDetailData.jobKeywords,
            'expFrom': vm.jobDetailData.txtExpFrom,
            'expTo': vm.jobDetailData.txtExpTo,
            'qualification': vm.jobDetailData.qualification,
            'noOfPosition': vm.jobDetailData.noOfPositions,
            'employmentType': empTypeSave,
            'requirementType': requirementType,
            'currency': vm.jobDetailData.currency,
            'salaryFrom': vm.jobDetailData.salaryRangeFrom,
            'salaryTo': vm.jobDetailData.salaryRangeTo,
            'rateType': rateType,
            'contractTerms': ct,
            'industry': indus,
            'functionalArea': vm.jobDetailData.functionalArea,
            'travelType': travelType,
            'aboutCompany': vm.jobDetailData.endClientDesc,
            'visibility': vm.jobDetailData.jobVisibility,
            'noticeIn': noticeDays,
            'refreshJob': vm.jobDetailData.refreshJobBy,
            'closingAt': moment(vm.jobDetailData.dt).format('YYYYMMDD'),
            'recruiterAssigned': recruiter,
            'expiredAt': null,
            'jobStatus': null,
            'jobLength' : vm.jobDetailData.jobLength,
            'remote' : rmt,
            'userJobId' : vm.jobDetailData.userJobId
          };
          // Calling Service to Post Data
          if (vm.jobPostMode === 'EditMode') {
            EmployerServices.postEditedJob(vm.jobId, employerId, vm.requestParams,vm.onPostNewJobSuccess,vm.onPostNewJobError);
          }
          else {
            var validForm = angular.element('#formEmployerAddNewJob').find('.No-Valid-Form');
            if (validForm.length <= 0) {
              EmployerServices.postNewJob(vm.requestParams,vm.onPostNewJobSuccess,vm.onPostNewJobError);
            }
          }
        };
        vm.onPostNewJobSuccess = function(response) {
          if (response.status === 201) {
            CustomAlertService.alert('New job is created successfully.');
            $timeout(function () {
              $state.go('employer.viewMyPostedJobs');
            }, 3000);
          }
          else if (response.status === 200) {
            CustomAlertService.alert('New job is modified successfully.');
            $timeout(function () {
              $state.go('employer.viewMyPostedJobs');
            }, 3000);
          }
          else if (response.status === 400) {
            CustomAlertService.alert('Sorry, Job couldn\'t created.');
          }
          else {
            CustomAlertService.alert('Sorry, please try again.');
          }
        };
        vm.onPostNewJobError = function() {
        };

        vm.changeInSkillsInput = function() {
          if(vm.jobDetailData.jobSkills.length > 2) {
            var value = vm.jobDetailData.jobSkills;
            var str = vm.jobDetailData.jobSkills;
            var n = str.lastIndexOf(',');
            var resultantString = str.substring(n + 1);

            if (value !== lastValue) {
              lastValue = value;
              if (timeout) {
                $timeout.cancel(timeout);
              }
              timeout = $timeout(function() {
                EmployerServices.getAllSkillsList(resultantString.trim(), vm.onSuccessSkillList, vm.onErrorSkillList);
              }, 350);
            }
          }
          else {
            vm.inputBoxShowListClass='';
            vm.isAppSiteListShow = false;
          }
        };


        $scope.result = '';
        $scope.options = {};

        vm.onSuccessSkillList = function(response) {
          vm.appDataList = response.data;
          if(vm.appDataList.length===0){
            vm.searchResultNotFoundClass = 'ng-show';
          }
          else{
            vm.searchResultNotFoundClass = 'ng-hide';
          }
          vm.inputBoxShowListClass='appSiteInputBox';
          vm.isAppSiteListShow = true;
        };

        vm.onErrorSkillList = function() {
          vm.searchResultNotFoundClass = 'HideElement';
        };

        vm.appSiteSelectedFromList = function(item) {
          var str = vm.jobDetailData.jobSkills;
          if (str.indexOf(',') > 0) {
            var n = str.lastIndexOf(',');
            var resultantString = str.substring(0, n);
            vm.jobDetailData.jobSkills = resultantString + ',' + item.skillName;
          }
          else
          {
            vm.jobDetailData.jobSkills = '';
            vm.jobDetailData.jobSkills = item.skillName;
          }
          vm.isAppSiteListShow = false;
        };


        function onSuccessSkillData(response) {

        }

        function onErrorSkillData(response) {

        }

        vm.loadSkillData = function(query) {

          return EmployerServices.getAllSkillsPromise(query);
        };

        vm.skillList = [];

        vm.addTagToSkillData = function(tag) {
          if (_.findIndex(vm.skillList, tag) < 0) {

            vm.skillList.push(tag);
          }
          vm.jobDetailData.jobSkills = _.pluck(vm.skillList, 'skillName').join(',');
        };

        vm.removeTagFromSkillData = function(tag) {
          var ind = _.findIndex(vm.skillList, tag) > -1 ? vm.skillList.splice(ind, 1) : '';
          vm.jobDetailData.jobSkills = _.pluck(vm.skillList, 'skillName').join(',');
        };

        vm.initialize();
    }]);
})();
