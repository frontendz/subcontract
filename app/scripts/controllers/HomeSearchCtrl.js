(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('HomeSearchCtrl', ['$scope', '$state', 'EmployerServices', '$stateParams', '$location', '_',
    function ($scope, $state, EmployerServices, $stateParams, $location, _) {
    var vm = this;
    var globalJobPageNo = 0,
        globalJobPageSize  = 25;

    vm.showGlobalLoadMore = true;
    vm.globalJobs = [];


    vm.initialize = function() {
      var query = $stateParams.query;
      var requestParams = {
        'query': query
      };
      vm.loadMoreGlobal = {
        'pageNo' : globalJobPageNo,
        'pageSize' : globalJobPageSize
      };
      EmployerServices.getSearchedJobsGlobal(requestParams, vm.loadMoreGlobal, vm.onSuccessSearch, vm.onErrorSearch);
    };

    vm.onSearchSubmit = function() {
      var query = vm.searchStr;
      vm.globalJobs = [];
      globalJobPageNo = 0;
      $location.search('query', vm.searchStr);

      var requestParams = {
        'query': query
      };
      vm.loadMoreGlobal = {
        'pageNo' : globalJobPageNo,
        'pageSize' : globalJobPageSize
      };
      EmployerServices.getSearchedJobsGlobal(requestParams, vm.loadMoreGlobal, vm.onSuccessSearch, vm.onErrorSearch);
    };

    vm.loadMoreGlobalJobs = function() {
      vm.initialize();
    };
    vm.onSuccessSearch = function(response) {
      var result = response.data;
      if (result.length) {
        _.each(result, function(dataInResult) {
          vm.globalJobs.push(dataInResult);
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
    };
    vm.viewSingleJob = function(jobData) {
      $state.go('viewSingleJob',
        {
          'jobId':jobData.jobId,
          'employerId': jobData.companyDetails.employerId
        }
      );
    };
    vm.onErrorSearch = function() {
    };
    vm.initialize();
  }]);
})();
