(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerSearchResume', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', 'CustomAlertService',
      function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService, CustomAlertService) {
      var vm = this;
      vm.candidates = [];
      vm.loading = true;
      var candidateParams = {};
      var skillParams = {};
      var URLData = window.URL;

      function initialize() {
        candidateParams = {
          employerId: AuthService.getEmployerId(),
          skills: []
        };
      }

      vm.search = function() {
        skillParams = {
          name: vm.searchText,
        };
        EmployerServices.getSkillByName(skillParams, onSkillSuccess, onSkillError);
      };

      function onSkillSuccess(skills) {
        if(skills.data.length > 0) {
          var skillsSet = '';
          for(var i=0; i<skills.data.length; i++) {
            skillsSet = skillsSet + skills.data[i].skillId + ',';
          }
          skillsSet = skillsSet.substring(0, skillsSet.length-1);
          EmployerServices.getCandidatesBySkillAndFirstLastName(candidateParams.employerId, skillsSet, vm.searchBy, vm.searchFLName, onSearchSuccess, onSearchError);
        }
      }

      function onSkillError(skillError) {
      }

      function onSearchSuccess(response) {
        vm.candidates = response.data;
        vm.loading = false;
      }

      function onSearchError(response) {
        vm.loading = false;
        vm.candidates.length = 0;
      }

      vm.downloadResume = function(candidateId) {
        EmployerServices.downloadParticularCandidateResume(candidateId, vm.onSuccessDownloadResume, vm.onErrorDownloadResume);
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
        if (response.status === 400) {
          CustomAlertService.alert('Either no resume exist or the candidate is private.');
        }
        else {
          var blob = NewBlob(response.data, response.headers('content-type'));
          var objectUrl = URL.createObjectURL(blob);
          window.open(objectUrl);
        }
      };

      vm.onErrorDownloadResume = function(response) {
        console.log(response);
        if (response.status === 400) {
          CustomAlertService.alert("Candidate resume does not exist.");
        }
      };

      initialize();

    }]);
})();
