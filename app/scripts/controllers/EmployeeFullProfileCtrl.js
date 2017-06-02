(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeFullProfileCtrl', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', 'moment', 'EmployeeServices','$rootScope', 'CustomAlertService', '_',
      function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService, moment, EmployeeServices,$rootScope, CustomAlertService, _) {
        var vm = this;
        vm.open1 = function() {
           vm.opened = true;
        };
        vm.initialize = function(){
          var d = new Date();
          d.setFullYear(d.getFullYear() - 18);
          vm.candidateData = {};
          vm.today = function() {
            vm.candidateData.dt = d;
          };

          vm.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
          };

          vm.today();
          vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(d),
            minDate: new Date('01-01-1931')
          };

          vm.requestParams = {};
          vm.candidateProfessional = [];
          vm.candidateProfObject = {};
          vm.candidateId = $stateParams.candidateId;
          vm.employerId = '';

          EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);
          EmployerServices.getAllSkillsListForEmpProfile(' ', vm.onSuccessSkillListForList, vm.onErrorSkillListForList);

          vm.userId = AuthService.getUserId();
          EmployeeServices.viewParticularCandidateFromCandidate(vm.userId, vm.onSuccessGetData, vm.onErrorGetData);
        };
        vm.onSuccessGetData = function(response) {
          vm.candidateData = response.data;

          if (vm.candidateData.dateOfBirth !== undefined) {
            vm.candidateData.dt = new Date(vm.candidateData.dateOfBirth);
          }
          vm.candidateData.mobileNumber = vm.candidateData.mobileNo;
        };
        vm.onErrorGetData = function() {};

        vm.onSuccessAllLookupData = function (response) {
          vm.lookupData = response.data;
          vm.educationData = vm.lookupData.Education;
          vm.industryType = vm.lookupData.IndustryType;
          vm.rateType = vm.lookupData.RateType;
          vm.experienceType = vm.lookupData.Experience;
          vm.employmentType = vm.lookupData.EmploymentType;
          vm.requirementType = vm.lookupData.RequirementType;
        };
        vm.onErrorAllLookupData = function() {};

        vm.onSuccessSkillListForList = function(response) {
          vm.allSkillsList = response.data;
        };
        vm.onErrorSkillListForList = function() {};

        vm.addCandidateBasicDetail = function() {
          if (vm.educationArrayForDisplay.length === 0) {
            CustomAlertService.alert('At least 1 Education data is mandatory');
          }
          else if (vm.skillArrayForDisplay.length === 0) {
            CustomAlertService.alert('At least 1 Skill data is mandatory');
          }
          else {
            var educationArray = [];
            if (vm.educationArrayForDisplay.length) { // If education detail is added then calling it's API
              var educationObj = {};
              educationArray = [];

              _.each(vm.educationArrayForDisplay, function(eduData) {
                educationObj = {
                  'qualificationTitle': eduData.qualificationTitle,
                  'qualificationType': '',
                  'year1': eduData.year1,
                  'year2': '',
                  'percentage': '',
                  'institute': '',
                  'university': eduData.university
                };
                educationArray.push(educationObj);
              });
            }

            vm.requestProfessionalParams = {
              'annualSalary': vm.candidateData.annualSalary,
              'employer': vm.candidateData.currentlyWorkingIn,
              'experience': vm.candidateData.experience,
              'employmentType': vm.candidateData.workingAs,
              'employerLocation': vm.candidateData.location,
              'joinedAt': '',
              'resignedAt': ''
            };
            var tempProfArray = [];
            tempProfArray.push(vm.requestProfessionalParams);

            var skillArray = [];
            if (vm.skillArrayForDisplay.length)  {
              var skillObj = {};

              _.each(vm.skillArrayForDisplay, function(skillData) {
                skillObj = {
                  'skillId': skillData.skillId,
                  'experience': skillData.experience
                };
                skillArray.push(skillObj);
              });
            }

            vm.requestParams = {
              'firstName': vm.candidateData.firstName,
              'lastName': vm.candidateData.lastName,
              'password': '',
              'currentLocation': vm.candidateData.currentCity,
              'mobileNo': vm.candidateData.mobileNumber,
              'currency': vm.candidateData.currency,
              'email': vm.candidateData.email,
              'resumeStatus': vm.candidateData.resumeStatus,
              'dateOfBirth': moment(vm.candidateData.dateOfBirth).format('YYYYMMDD'),
              'candidateQualifications': educationArray,
              'candidateProfessional': tempProfArray,
              'candidateSkills' : skillArray,
              'placed' : false,
              'active': false
            };

            EmployeeServices.updateCandidate(vm.userId, vm.requestParams, vm.onAddNewCandidateSuccess,vm.onAddNewCandidateError);
          }
        };
        vm.onAddNewCandidateSuccess = function() {
          CustomAlertService.alert('Congrats ! Registration successful. Please verify your account from email.');

          // var fd = new FormData();
          // fd.append('file', vm.candidateData.latestReume);
          //
          // EmployerServices.addResumeOnServerWithoutKey(fd, vm.candidateData.candidateId, vm.onResumeUploadSuccess,vm.onResumeUploadError);

          $timeout(function () {
            $state.go('home');
          }, 2500);
        };
        vm.onAddNewCandidateError = function() {
          CustomAlertService.alert('something went wrong.');
        };

        vm.onResumeUploadSuccess = function() {};
        vm.onResumeUploadError = function() {};

        vm.educationArrayForDisplay = [];
        vm.educationArray = [];
        var educationObjForDisplay = {};
        vm.addNewEducation = function() {
          if (vm.degree === undefined || vm.year1 === undefined || vm.university === undefined) {
            CustomAlertService.alert('Education, Year & University are mandatory.');
          }
          else {
            var flag = false;
            if (vm.educationArrayForDisplay.length > 0) {
              var ind = _.findIndex(vm.educationArrayForDisplay, {'masterId': vm.degree.masterId});
              if (ind > -1) {
                flag = true;
                CustomAlertService.alert('Education Detail already added');
              }
            }

            if (!flag) {
              educationObjForDisplay = {
                'masterId' : vm.degree.masterId,
                'qualificationTitle' : vm.degree.displayTitle,
                'year1' : vm.year1,
                'university' : vm.university
              };

              vm.educationArrayForDisplay.push(educationObjForDisplay);
              vm.year1 = undefined;
              vm.university = undefined;
              vm.degree =  undefined;
            }
          }
        };
        vm.removeEducation = function(edu) {
          if (vm.educationArrayForDisplay.length > 0) {
            var ind = _.findIndex(vm.educationArrayForDisplay, {'masterId': edu.masterId});
            if (ind > -1) {
              vm.educationArrayForDisplay.splice(ind, 1);
            }
          }
        };

        // Skills Manipulation
        vm.skillArrayForDisplay = [];
        vm.skillArray = [];
        var skillObjForDisplay = {};
        vm.addNewSkill = function() {
          if (vm.experience === undefined || vm.skillItem === undefined) {
            CustomAlertService.alert('Skill Name & Experience are mandatory.');
          }
          else {
            var flag = false;
            if (vm.skillArrayForDisplay.length > 0) {
              var ind = _.findIndex(vm.skillArrayForDisplay, {'skillId': vm.skillItem.skillId});
              if (ind > -1) {
                flag = true;
                CustomAlertService.alert('Skill already added');
              }
            }
            if (!flag) {
              skillObjForDisplay = {
                'skillId' : vm.skillItem.skillId,
                'skillName' : vm.skillItem.skillName,
                'experience' : vm.experience
              };

              vm.skillArrayForDisplay.push(skillObjForDisplay);
              vm.skillItem = undefined;
              vm.experience = undefined;
            }
          }
        };
        vm.removeSkill = function(skill) {
          var sId = skill.skillId;
          if (vm.skillArrayForDisplay.length > 0) {
            var ind = _.findIndex(vm.skillArrayForDisplay, {'skillId': sId});
            if (ind > -1) {
              vm.skillArrayForDisplay.splice(ind, 1);
            }
          }
        };
        vm.initialize();
    }]);
})();
