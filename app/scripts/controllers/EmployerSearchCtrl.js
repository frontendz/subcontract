(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerSearchCtrl', ['$scope', '$location', '$state', 'EmployerServices', '$timeout', '$stateParams', 'AuthService', '_',
      function($scope, $location, $state, EmployerServices, $timeout, $stateParams, AuthService, _) {
      var vm = this;
      var globalJobPageNo = 0,
          globalJobPageSize  = 25;

      vm.showGlobalLoadMore = true;

      vm.jobs = [];
      function initialize() {
        var requestParams = {
          'query': $stateParams.query
        };
        vm.loadMoreGlobal = {
          'pageNo' : globalJobPageNo,
          'pageSize' : globalJobPageSize
        };
        EmployerServices.getSearchedJobs(requestParams, vm.loadMoreGlobal, onSearchSuccess, onSearcherror);
      }

      function onSearchSuccess(response) {
        var result = response.data;
        if (result.length) {
          _.each(result, function(dataInResult) {
            vm.jobs.push(dataInResult);
          });

          if (result.length < globalJobPageSize) {
            vm.showGlobalLoadMore = false;
          }
          else {
            vm.showGlobalLoadMore = true;
          }
        }
        else {
          vm.showGlobalLoadMore = false;
        }
        globalJobPageNo++;
      }

      vm.loadMoreJobs = function() {
        initialize();
      };

      function onSearcherror(response) {
      }
      vm.viewJob = function(jobData, view) {
        $state.go('employer.viewJob', {
          'jobId': jobData.jobId,
          'userType': 'Employer',
          'viewFrom': view
        });
      };
      initialize();

    }]);
})();
