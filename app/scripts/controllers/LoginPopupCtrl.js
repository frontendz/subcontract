(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('LoginPopupCtrl', ['$rootScope', '$scope', '$state', '$stateParams', 'AuthService', 'CustomAlertService', '$uibModalInstance', '$timeout',
    function ($rootScope, $scope, $state, $stateParams, AuthService, CustomAlertService, $uibModalInstance, $timeout) {

    // alerts display
    if ($rootScope.sharedJob !== undefined) {
      var jobIdFromURL = $rootScope.sharedJob.jobId;
    }
    $scope.close = function() {
      $uibModalInstance.close();
    };

    $scope.onLoginFormSubmit = function() {
       var requestParams = {
         'username': $scope.email,
         'password': $scope.password,
       };
       AuthService.loginService(requestParams, $scope.onSuccess, $scope.onError);
    };

    $scope.onSuccess = function(response) {
      $scope.loginResponse = response.data;
      $scope.isLoading = false;

      if (response.status === 202) {
        if ($scope.loginResponse.userType === 'EMPLOYER' || $scope.loginResponse.userType === 'RECRUITER') {
          $rootScope.user = $scope.loginResponse.employerName;
          if ($scope.loginResponse.isActive === true) {
            AuthService.storeUserInformation($scope.loginResponse);
            if ($scope.loginResponse.isProfileUpdated === true) {
              if (jobIdFromURL === undefined) {
                $state.go('employer.dashboard');
              }
              else {
                $state.go('employer.viewJob', {
                  'jobId': jobIdFromURL,
                  'userType': 'Employer'
                });
              }
            }
            else {
              $state.go('employerTempProfile');
            }
          }
          else {
            AuthService.storeUserInformation($scope.loginResponse);
            if ($scope.loginResponse.isProfileUpdated === false) {
              $state.go('employerTempProfile');
            }
            else {
              CustomAlertService.alert('Email verification is not completed. Please activate your email.');
            }
          }
        }
        else { // Employee
          $rootScope.user = $scope.loginResponse.firstName;
          if ($scope.loginResponse.isActive === true) {
            AuthService.storeUserInformation($scope.loginResponse);
            if ($scope.loginResponse.isProfileUpdated === true) {
              $state.go('employee.dashboard');
            }
            else {
              //$state.go('employee.dashboard');
              $state.go('employeeCandidateProfile', {
                'candidateData' : $scope.loginResponse.candidateId
              });
            }
          }
          else {
            AuthService.storeUserInformation($scope.loginResponse);
            if ($scope.loginResponse.isProfileUpdated === false) {
              $state.go('employeeCandidateProfile', {
                'candidateData' : $scope.loginResponse.candidateId
              });
            }
            else {
              CustomAlertService.alert('Email verification is not completed. Please activate your email.');
            }
          }
        }
      }
      else if (response.status === 400) {
        CustomAlertService.alert(response.data.errorMsg);
      }
    };

    $scope.onError = function(response) {
      if(response.status === 401){
        CustomAlertService.alert('please login with your provided credentials and try again.');
      }
    };
  }]);
})();
