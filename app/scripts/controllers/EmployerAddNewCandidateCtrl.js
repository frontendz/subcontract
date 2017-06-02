(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployerAddNewCandidateCtrl', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', 'moment', 'CustomAlertService', '_',
        function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService, moment, CustomAlertService, _) {
        var vm = this;
        var lastValue = '';
        var timeout;

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
            minDate: new Date('1/1/1931')
          };

          vm.requestParams = {};
          vm.candidateProfessional = [];
          vm.candidateProfObject = {};
          vm.candidateId = $stateParams.candidateId;
          vm.employerId = AuthService.getEmployerId();

          EmployerServices.gelAllLookupData(vm.onSuccessAllLookupData, vm.onErrorAllLookupData);

          EmployerServices.getAllSkillsList(' ', vm.onSuccessSkillListForList, vm.onErrorSkillListForList);

          if (vm.candidateId === undefined || vm.candidateId === null || vm.candidateId === '') {
            vm.saveMode = 'NewMode';
          }
          else {
            vm.saveMode = 'EditMode';
            EmployerServices.viewParticularCandidate(vm.employerId, vm.candidateId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
          }
        };

        vm.onSuccessAllLookupData = function (response) {
          vm.lookupData = response.data;
          vm.educationData = vm.lookupData.Education;
          vm.industryType = vm.lookupData.IndustryType;
          vm.rateType = vm.lookupData.RateType;
          vm.employmentType = vm.lookupData.EmploymentType;
          vm.requirementType = vm.lookupData.RequirementType;

          if (vm.saveMode === 'EditMode') {
            if (vm.candidateData.candidateQualifications && vm.candidateData.candidateQualifications[0].qualificationTitle !== undefined) {
              var tType = _.findIndex(vm.educationData, {'displayTitle' : vm.candidateData.candidateQualifications[0].qualificationTitle })
              tType > -1 ? vm.candidateData.educationData = vm.educationData[tType] : '';
            }
          }
        };
        vm.onErrorAllLookupData = function() {
        };

        vm.onSuccessSkillListForList = function(response) {
          vm.allSkillsList = response.data;
        };
        vm.onErrorSkillListForList = function(response) {
        };

        vm.onSuccessMyCandidates = function(response) {
          vm.candidateData = response.data;

          if (vm.candidateData.dateOfBirth !== undefined) {
            vm.candidateData.dt = new Date(vm.candidateData.dateOfBirth);
          }
          vm.candidateData.mobileNumber = vm.candidateData.mobileNo;

          if (vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].annualSalary !== undefined) {
            vm.candidateData.annualSalary = vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].annualSalary;
            vm.candidateData.annualSalary = parseFloat(vm.candidateData.annualSalary);
          }
          if (vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].hourlyRate !== undefined) {
            vm.candidateData.hourlyRate = vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].hourlyRate;
            vm.candidateData.hourlyRate = parseFloat(vm.candidateData.hourlyRate);
          }
          if (vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].employer !== undefined) {
            vm.candidateData.currentlyWorkingIn = vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].employer;
          }
          if (vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].employmentType !== undefined) {
            vm.candidateData.workingAs = vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].employmentType;
          }
          if (vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].currency !== undefined) {
            vm.candidateData.currency = vm.candidateData.candidateProfessional[vm.candidateData.candidateProfessional.length- 1].currency;
          }
          vm.candidateData.latestReume = '';
          if (vm.candidateData.candidateQualifications && vm.candidateData.candidateQualifications.length) {
            var educationObjForDisplay = {};
            _.each(vm.candidateData.candidateQualifications, function(eduData) {
              educationObjForDisplay = {
                'masterId' : '1',
                'qualificationTitle' : eduData.qualificationTitle,
                'year1' : eduData.year1,
                'university' : eduData.university
              };

              vm.educationArrayForDisplay.push(educationObjForDisplay);
            });
          }

          if (vm.candidateData.candidateSkills && vm.candidateData.candidateSkills.length) {
            var skilltionObjForDisplay = {};
            _.each(vm.candidateData.candidateSkills, function(skillData) {
              skillObjForDisplay = {
                'skillId' : skillData.skillId,
                'skillName' : skillData.skillSetName,
                'experience' : skillData.experience
              };

              vm.skillArrayForDisplay.push(skillObjForDisplay);
            });
          }
        };

        vm.onErrorMyCandidates = function() {

        };

        vm.editCandidateBasicDetail = function() {
          if (vm.educationArrayForDisplay.length === 0) {
            CustomAlertService.alert('At least 1 Education data is mandatory');
          }
          else if (vm.skillArrayForDisplay.length === 0) {
            CustomAlertService.alert('At least 1 Skill data is mandatory');
          }
          else if ((vm.candidateData.hourlyRate === undefined && vm.candidateData.annualSalary === undefined) || (vm.candidateData.hourlyRate === '' && vm.candidateData.annualSalary === '') || (vm.candidateData.hourlyRate === null && vm.candidateData.annualSalary === null) ) {
            CustomAlertService.alert('Hourly Rate / Annual Salary is mandatory');
          }
          else {
            vm.requestParams = {
              'firstName': vm.candidateData.firstName,
              'lastName': vm.candidateData.lastName,
              'password': '',
              'currentLocation': vm.candidateData.currentLocation,
              // 'mobileNo': vm.candidateData.countryCode + '' + vm.candidateData.mobileNumber,
              'mobileNo': vm.candidateData.mobileNumber,
              'currency': vm.candidateData.currency,
              'email': vm.candidateData.email,
              'resumeStatus': vm.candidateData.resumeStatus,
              'dateOfBirth': moment(vm.candidateData.dt).format('YYYYMMDD'),
            };
            // Calling Service to Post Data
            EmployerServices.editBasicCandidateDetail(vm.employerId, vm.candidateId, vm.requestParams,vm.onAddNewCandidateSuccess,vm.onAddNewCandidateError);

            if (vm.candidateData.latestReume !== null || vm.candidateData.latestReume === undefined || vm.candidateData.latestReume === '')
            {
              var fd = new FormData();
              fd.append('file', vm.candidateData.latestReume);
              EmployerServices.addResumeOnServer(fd, vm.candidateId, vm.onResumeUploadSuccess,vm.onResumeUploadError);
            }

            var employerId = AuthService.getEmployerId();
            // Creating Other Candidate Qualification Data's JSON

            if (vm.educationArrayForDisplay.length) { // If education detail is added then calling it's API
              var educationObj = {};
              var educationArray = [];

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
              EmployerServices.addCandidateQualification(employerId, vm.candidateId, educationArray, vm.onSuccessQualification, vm.onErrorQualification);
            }

            vm.requestProfessionalParams = {
              'annualSalary': vm.candidateData.annualSalary,
              'hourlyRate' : vm.candidateData.hourlyRate,
              'employer': vm.candidateData.currentlyWorkingIn,
              'experience': vm.candidateData.experience,
              'employmentType': vm.candidateData.workingAs,
              'employerLocation': vm.candidateData.currentLocation,
              'joinedAt': '',
              'resignedAt': ''
            };
            var tempProfArray = [];
            tempProfArray.push(vm.requestProfessionalParams);
            EmployerServices.addCandidateProfession(employerId, vm.candidateId, tempProfArray, vm.onSuccessProfession, vm.onErrorProfession);

            if (vm.skillArrayForDisplay.length)  {
              var skillObj = {};
              var skillArray = [];

              _.each(vm.skillArrayForDisplay, function(skillData) {
                skillObj = {
                  'skillId': skillData.skillId,
                  'experience': skillData.experience
                };
                skillArray.push(skillObj);
              });

              EmployerServices.addCandidateSkill(employerId, vm.candidateId, skillArray, vm.onSuccessSkill, vm.onErrorSkill);
            }

            CustomAlertService.alert('Candidate details are modified.');
            $timeout(function () {
              $state.go('employer.myCandidates');
            }, 3000);
          }
        };

        var NewBlob = function(data, datatype)
        {
            var out;

            try {
                out = new Blob([data], {type: datatype});
                console.debug("case 1");
            }
            catch (e) {
                window.BlobBuilder = window.BlobBuilder ||
                        window.WebKitBlobBuilder ||
                        window.MozBlobBuilder ||
                        window.MSBlobBuilder;

                if (e.name == 'TypeError' && window.BlobBuilder) {
                    var bb = new BlobBuilder();
                    bb.append(data);
                    out = bb.getBlob(datatype);
                    console.debug("case 2");
                }
                else if (e.name == "InvalidStateError") {
                    // InvalidStateError (tested on FF13 WinXP)
                    out = new Blob([data], {type: datatype});
                    console.debug("case 3");
                }
                else {
                    // We're screwed, blob constructor unsupported entirely
                    console.debug("Errore");
                }
            }
            return out;
        }

        vm.onSuccessDownloadResume = function(response) {
          // var blob = new Blob([response.data], {type: response.headers('content-type')});
          // var objectUrl = window.URL.createObjectURL(blob);
          // window.open(objectUrl);

          //var blob = new Blob([response.data], {type: response.headers('content-type')});
          var blob = NewBlob(response.data, response.headers('content-type'));
          var objectUrl = URL.createObjectURL(blob);
          window.open(objectUrl);
        };

        vm.onErrorDownloadResume = function(response) {
        };

        vm.downloadResume = function() {
          EmployerServices.downloadParticularCandidateResume(vm.candidateId, vm.onSuccessDownloadResume, vm.onErrorDownloadResume);
        }

        vm.onResumeUploadSuccess = function() {
        };
        vm.onResumeUploadError = function() {
        };
        vm.onSuccessQualification = function() {
        };
        vm.onErrorQualification = function() {
        };
        vm.onSuccessProfession = function() {
        };
        vm.onErrorProfession = function() {
        };
        vm.onSuccessSkill = function() {
        };
        vm.onErrorSkill = function() {
        };

        vm.educationArrayForDisplay = [];
        vm.educationArray = [];
        var educationObjForDisplay = {};

        vm.addNewEducation = function() {
          if (vm.degree === undefined || vm.year1 === undefined || vm.university === undefined) {
            CustomAlertService.alert('Education, Year & University are mandatory.')
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
            CustomAlertService.alert('Skill Name & Experience are mandatory.')
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

        vm.addCandidateBasicDetail = function() {
          if (vm.educationArrayForDisplay.length === 0) {
            CustomAlertService.alert('At least 1 Education data is mandatory');
          }
          else if (vm.skillArrayForDisplay.length === 0) {
            CustomAlertService.alert('At least 1 Skill data is mandatory');
          }
          else if ((vm.candidateData.hourlyRate === undefined && vm.candidateData.annualSalary === undefined) || (vm.candidateData.hourlyRate === '' && vm.candidateData.annualSalary === '') || (vm.candidateData.hourlyRate === null && vm.candidateData.annualSalary === null) ) {
            CustomAlertService.alert('Hourly Rate / Annual Salary is mandatory');
          }
          else {
            // Saving Basic Info
            if (vm.candidateData.dt === undefined) {
              vm.candidateData.dt = '19310101';
            }
            vm.requestParams = {
              'firstName': vm.candidateData.firstName,
              'lastName': vm.candidateData.lastName,
              'password': '',
              'currentLocation': vm.candidateData.currentLocation,
              'mobileNo': vm.candidateData.mobileNumber,
              'currency': vm.candidateData.currency,
              'email': vm.candidateData.email,
              'resumeStatus': vm.candidateData.resumeStatus,
              'dateOfBirth': moment(vm.candidateData.dt).format('YYYYMMDD'),
            };
            EmployerServices.addNewCandidate(vm.requestParams,vm.onAddNewCandidateSuccess,vm.onAddNewCandidateError);
          }
        };

        vm.onAddNewCandidateSuccess = function(response) {
          var result = response.data;

          if (response.status === 201) {
            // Uploading Resumes
            var fd = new FormData();
            fd.append('file', vm.candidateData.latestReume);
            var candidateId = result.candidateId;
            EmployerServices.addResumeOnServer(fd, candidateId, vm.onResumeUploadSuccess,vm.onResumeUploadError);

            var employerId = AuthService.getEmployerId();

            if (vm.educationArrayForDisplay.length) { // If education detail is added then calling it's API
              var educationObj = {};
              var educationArray = [];

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
              EmployerServices.addCandidateQualification(employerId, candidateId, educationArray, vm.onSuccessQualification, vm.onErrorQualification);
            }

            vm.requestProfessionalParams = {
              'annualSalary': vm.candidateData.annualSalary,
              'currency': vm.candidateData.currency,
              'hourlyRate' : vm.candidateData.hourlyRate,
              'employer': vm.candidateData.currentlyWorkingIn,
              'experience': vm.candidateData.experience,
              'employmentType': vm.candidateData.workingAs,
              'employerLocation': vm.candidateData.currentLocation,
              'joinedAt': '',
              'resignedAt': ''
            };
            var tempProfArray = [];
            tempProfArray.push(vm.requestProfessionalParams);
            EmployerServices.addCandidateProfession(employerId, candidateId, tempProfArray, vm.onSuccessProfession, vm.onErrorProfession);

            if (vm.skillArrayForDisplay.length)  {
              var skillObj = {};
              var skillArray = [];

              _.each(vm.skillArrayForDisplay, function(skillData) {
                skillObj = {
                  'skillId': skillData.skillId,
                  'experience': skillData.experience
                };
                skillArray.push(skillObj);
              });
              EmployerServices.addCandidateSkill(employerId, candidateId, skillArray, vm.onSuccessSkill, vm.onErrorSkill);
            }

            CustomAlertService.alert('New Candidate is created.');
            $timeout(function () {
              $state.go('employer.myCandidates');
            }, 3000);

          }
          else if (response.status === 400) {
            CustomAlertService.alert(response.data[0].errorMsg);
          }
        };
        vm.onAddNewCandidateError = function() {
        };

        vm.initialize();
    }]);
})();
