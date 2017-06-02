(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerCandidateDetailsCtrl', ['$scope', '$state', 'EmployerServices', 'AuthService', '$uibModal', '$stateParams', 'CustomAlertService',
    function ($scope, $state, EmployerServices, AuthService, $uibModal, $stateParams, CustomAlertService) {
    var vm = this;
    vm.result = {};
    var candidateId = '';
    var employerId  = '';

    vm.initialize = function() {
      employerId = AuthService.getEmployerId();
      candidateId = $stateParams.candidateId;
      EmployerServices.viewParticularCandidate(employerId, candidateId, vm.onSuccessMyCandidates, vm.onErrorMyCandidates);
    };
    vm.onSuccessMyCandidates = function(response) {
      vm.candidateData = response.data;
    };
    vm.onErrorMyCandidates = function(response) {
    };

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
      console.log(response);
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
      if (response.status === 400) {
        CustomAlertService.alert("Candidate resume does not exist.")
      }
    };
    vm.initialize();
  }]);
})();
