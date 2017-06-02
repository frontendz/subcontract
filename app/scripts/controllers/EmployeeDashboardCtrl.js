(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployeeDashboardCtrl', ['$scope', '$state', 'AuthService', 'EmployerServices', 'EmployeeServices', '_',
      function ($scope, $state, AuthService, EmployerServices, EmployeeServices, _) {
        var vm = this;
        var publicJobPageNo = 0,
            publicJobPageSize = 25,
            appliedJobPageNo = 0,
            appliedJobPageSize = 25;

        vm.showPublicLoadMore = true;
        vm.showAppliedLoadMore = true;

        vm.publicJobs = [];
        vm.appliedJobs = [];

        vm.requestParams = {
          'userId' : AuthService.getUserId()
        };

        vm.initialize = function() {
          vm.loadMorePublic = {
            'pageNo' : publicJobPageNo,
            'pageSize' : publicJobPageSize
          };
          EmployeeServices.viewPublicJobsFromEmployee(vm.requestParams, vm.loadMorePublic, onPublicJobSuccess, onPublicJobError);
        };

        function getMyAppliedJobs() {
          vm.loadMoreApplied = {
            'pageNo' : appliedJobPageNo,
            'pageSize' : appliedJobPageSize
          };
          console.log(vm.loadMoreApplied);
          EmployeeServices.viewMyAppliedJobsFromEmployee(vm.requestParams, vm.loadMoreApplied, onAppliedJobSuccess, onAppliedJobError);
        }

        function getJobs(view) {
          switch (view) {
            case 'publicJobs':
              publicJobPageNo = 0;
              publicJobPageSize = 25;
              vm.initialize();
              break;
            case 'appliedJobs':
              appliedJobPageNo = 0;
              appliedJobPageSize = 25;
              getMyAppliedJobs();
              break;
            default:
              vm.initialize();
          }
        }

        function onPublicJobSuccess(response) {
          var result = response.data;
          if (result.length) {
            _.each(result, function(dataInResult) {
              vm.publicJobs.push(dataInResult);
            });
            if (result.length < publicJobPageSize) {
              vm.showPublicLoadMore = false;
            }
            else {
              vm.showPublicLoadMore = true;
            }
          }
          else {
            vm.showPublicLoadMore = false;
          }
          publicJobPageNo++;
        }

        function onPublicJobError() {
        }

        function onAppliedJobSuccess(response) {
          var result = response.data;
          if (result.length) {
            _.each(result, function(dataInResult) {
              vm.appliedJobs.push(dataInResult);
            });

            if (result.length < appliedJobPageSize) {
              vm.showAppliedLoadMore = false;
            }
            else {
              vm.showAppliedLoadMore = true;
            }
          }
          else {
            vm.showAppliedLoadMore = false;
          }
          appliedJobPageNo++;
        }

        function onAppliedJobError() {
        }

        vm.viewJob = function(jobData) {
          $state.go('employee.viewJob', {
            'jobId': jobData.jobId,
            'userType' : 'Employee'
          });
        };

        vm.viewAppliedJob = function(jobData, typeOfJob) {
          $state.go('employee.viewAppliedJob', {
            'jobId': jobData.jobId,
            'userType' : 'Employee',
          });
        };

        vm.switchTab = function (view) {
          $('.active').removeClass('active');
          $('#' + view).addClass('active');
          getJobs(view);
        };

        vm.loadMorePublicJobs = function() {
          vm.initialize();
        };

        vm.loadMoreAppliedJobs = function() {
          getMyAppliedJobs();
        };

        vm.initialize();
      }]);
})();
