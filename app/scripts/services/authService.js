(function(){
  'use strict';
  angular.module('scApp.services')
    .factory('AuthService', ['$http', '$rootScope', 'API_URL', '$cookies', function($http, $rootScope, API_URL, $cookies) {
      var globals;
      if($cookies.get('globals') && !angular.isUndefined($cookies.get('globals'))) {
        globals = JSON.parse($cookies.get('globals'));
      }
      return {
        loginService: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'login',
            headers: requestParams
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        storeUserInformation: function(userInfo) {
          if (userInfo.userType === 'EMPLOYER' || userInfo.userType === 'RECRUITER') {
            globals = {
              'authToken': userInfo.authToken,
              'userName': userInfo.userName,
              'userId' : userInfo.userId,
              'employerId' : userInfo.employerId,
              'employerName' : userInfo.employerName
            };
          }
          else {
            globals = {
              'authToken': userInfo.authToken,
              'userName': userInfo.userName,
              'userId' : userInfo.userId,
              'candidateId' : userInfo.candidateId,
              'employeeName' : userInfo.firstName
            };
          }
          $cookies.put('globals', JSON.stringify(globals));
        },

        askForDemo: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/demo?name=' + requestParams.name + '&emailId=' + requestParams.emailid + '&phoneNo=' + requestParams.phoneNo,
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        updateToken: function(token) {
          globals.authToken = token;
          $cookies.put('globals', JSON.stringify(globals));
        },

        isLoggedIn: function() {
          return (!angular.isUndefined(globals) && globals);
        },

        getEmployerName: function() {
          return globals.employerName;
        },

        getEmployeeName: function() {
          return globals.employeeName;
        },

        getUserId: function() {
          return globals.userId;
        },

        getEmployerId: function() {
          return globals.employerId;
        },

        getCandidateId: function() {
          return globals.candidateId;
        },

        getToken: function() {
          return globals.authToken;
        },

        clearUserData: function() {
          globals = {};
        },

        clearToken: function() {
          globals = null;
          $cookies.remove('globals');
        },

        logout: function(successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'logout',
            headers: {
              'authToken': this.getToken()
            }
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        forgotPassword: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/user/forgotPassword?email=' + requestParams.email + '&mobileNo=' + requestParams.mobile,
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        resetPassword: function(requestParams, authToken, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/user/reset?token=' + authToken + '&newpw=' + requestParams.password,
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
      };
    }]);
})();
