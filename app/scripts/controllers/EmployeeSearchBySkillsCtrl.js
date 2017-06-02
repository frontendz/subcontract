(function() {
    'use strict';
    angular.module('scApp.controllers')
      .controller('EmployeeSearchBySkillsCtrl', ['$scope', '$location', 'EmployerServices', 'EmployeeServices', 'AuthService', '$window', '$state',
        function($scope, $location, EmployerServices, EmployeeServices, AuthService, $window, $state) {
        var vm = this;
        var resultantString = ' ';
        var userId = AuthService.getUserId();

        vm.onSuccessSkillListForList = function(response) {
          vm.skillList = response.data;
        }

        vm.onErrorSkillListForList = function(response) {

        }
        EmployerServices.getAllSkillsList(' ', vm.onSuccessSkillListForList, vm.onErrorSkillListForList);
        function onSuccessJobs(response) {
          vm.jobsData = response.data;
        }

        function onErrorJobs(response) {
        }

        vm.searchJobs = function() {
          EmployeeServices.getSearchedJobsByTypes(userId, vm.selectedSkill.skillName, 'skill', onSuccessJobs, onErrorJobs);
        };

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employee'
          });
        };
    }]);
})();
