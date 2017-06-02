(function(){
  'use strict';
  angular.module('scApp.services')
    .factory('UserMetaDataService', function() {
      var employerDetail = {};
      var employeeDetail = {};

      return {
        setEmployerDetail: function(item) {
          employerDetail = {
            'employerId' : item.employerId,
            'userId' : item.userId,
            'employerName' : item.name,
            'employerEmail' : item.email
          };
        },

        getEmployerId: function() {
          return employerDetail.employerId;
        },

        getUserId: function() {
          return employerDetail.userId;
        },

        getEmployerName:function(){
          return employerDetail.employerName;
        },

        setEmployeeDetail: function(item) {
          employeeDetail = {
            'employeeFirstName' : item.firstName,
            'employeeLastName' : item.lastName,
            'employeeMobileNo' : item.mobileNo,
            'employeeEmail': item.email,
            'employeeDateOfBirth' : item.dateOfBirth
          };
        }
      };
    });
})();
