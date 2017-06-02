(function() {
  'use strict';

  angular.module('scApp.controllers')
    .controller('EmployerDashboard', ['$rootScope', '$scope', '$state', 'AuthService', 'EmployerServices', '$uibModal', 'EmployeeServices', '_', 'CustomAlertService',
      function ($rootScope, $scope, $state, AuthService, EmployerServices, $uibModal, EmployeeServices, _, CustomAlertService) {
        var vm = this;
        var employerId = AuthService.getEmployerId();
        var publicJobPageNo = 0,
            publicJobPageSize = 25,
            myJobPageNo = 0,
            myJobPageSize = 25,
            appliedJobPageNo = 0,
            appliedJobPageSize = 25,
            connectionJobPageNo = 0,
            connectionJobPageSize  = 25;

        vm.showPublicLoadMore = true;
        vm.showMyLoadMore = true;
        vm.showAppliedLoadMore = true;
        vm.showConnectionLoadMore = true;

        vm.publicJobs = [];
        vm.postedJobs = [];
        vm.appliedJobs = [];
        vm.connectionJobs = [];

        vm.requestParams = {
          'userId': AuthService.getEmployerId(),
          'employerId': AuthService.getEmployerId()
        };

        vm.initializeJobs = function() {
          vm.loadMorePublic = {
            'pageNo' : publicJobPageNo,
            'pageSize' : publicJobPageSize
          };
          EmployerServices.viewPublicJobs(vm.requestParams, vm.loadMorePublic, onPublicJobSuccess, onPublicJobError);
        };

        function onSuccessRecentJobs(response) {
          vm.recentJobs = response.data;
        }

        function onErrorRecentJobs() {

        }
        function onSuccessCount(response) {
          vm.statesData = response.data;
        }
        function onErrorCount() {

        }
        vm.initializeRecentJobs = function() {
          EmployeeServices.viewRecentJobs(onSuccessRecentJobs, onErrorRecentJobs);
          employerId = AuthService.getEmployerId();
          EmployerServices.countStatastics(employerId, onSuccessCount, onErrorCount);
        };

        function getConnectionPostedJobs() {
          vm.loadMoreConnection = {
            'pageNo' : connectionJobPageNo,
            'pageSize' : connectionJobPageSize
          };
          EmployerServices.viewMyConnectionPostedJobs(vm.requestParams.employerId, vm.loadMoreConnection, onConnectionJobSuccess, onConnectionJobError);
        }

        function getMyPostedJobs() {
          vm.loadMoreMy = {
            'pageNo' : myJobPageNo,
            'pageSize' : myJobPageSize
          };
          EmployerServices.viewMyPostedJobs(vm.requestParams, vm.loadMoreMy, onPostedJobSuccess, onPostedJobError);
        }

        function getMyAppliedJobs() {
          vm.loadMoreApplied = {
            'pageNo' : appliedJobPageNo,
            'pageSize' : appliedJobPageSize
          };
          EmployerServices.viewMyAppliedJobs(vm.requestParams, vm.loadMoreApplied, onAppliedJobSuccess, onAppliedJobError);
        }

        function getRecentEmployers() {
          EmployerServices.getRecentSignedInEmployer(vm.requestParams.employerId, onSuccessSignIn, onErrorSignIn);
        }

        vm.initializeEmployers = function() {
          EmployerServices.getAllEmployerDomainWise(vm.requestParams.employerId, 'notAll', onSuccessYouMay, onErrorYouMay);
        };

        function getEmployers(view) {
          switch (view) {
            case 'youMayKnow':
              vm.initializeEmployers();
              break;
            case 'recentlySigned':
              getRecentEmployers();
              break;
            default:
              vm.initializeEmployers();
            }
        }

        function getJobs(view) {
          switch (view) {
            case 'publicJobs':
              vm.initializeJobs();
              break;
            case 'connectionJobs':
              getConnectionPostedJobs();
              break;
            case 'postedJobs':
              getMyPostedJobs();
              break;
            case 'appliedJobs':
              getMyAppliedJobs();
              break;
            default:
              vm.initializeJobs();
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

        function onConnectionJobSuccess(response) {
          var result = response.data;
          if (result.length) {
            _.each(result, function(dataInResult) {
              vm.connectionJobs.push(dataInResult);
            });

            if (result.length < connectionJobPageSize) {
              vm.showConnectionLoadMore = false;
            }
            else {
              vm.showConnectionLoadMore = true;
            }
          }
          else {
            vm.showConnectionLoadMore = false;
          }
          connectionJobPageNo++;
        }

        function onConnectionJobError() {
        }

        function onPostedJobSuccess(response) {
          var result = response.data;
          if (result.length) {
            _.each(result, function(dataInResult) {
              vm.postedJobs.push(dataInResult);
            });

            if (result.length < myJobPageSize) {
              vm.showMyLoadMore = false;
            }
            else {
              vm.showMyLoadMore = true;
            }
          }
          else {
            vm.showMyLoadMore = false;
          }
          myJobPageNo++;
        }

        function onPostedJobError() {
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

        function onSuccessSignIn(response) {
            vm.signedIn = response.data;
        }

        function onErrorSignIn() {
        }

        function onSuccessYouMay(response) {
            vm.youMayKnow = response.data;
        }

        function onErrorYouMay() {

        }

        function onSuccessConnectEmployer() {
          CustomAlertService.alert('Request sent for connection');
        }

        function onErrorConnectEmployer() {

        }

        vm.connectEmployer = function(emp, typeOfCall) {
          vm.typeOfView = typeOfCall;
          vm.requestParamsTemp = {
            'requestedTo' : emp.employerId
          };
          EmployerServices.sendNetworkRequest(employerId, vm.requestParamsTemp, onSuccessConnectEmployer, onErrorConnectEmployer);
        };

        vm.viewJob = function(jobData, view) {
          $state.go('employer.viewJob', {
            'jobId': jobData.jobId,
            'userType': 'Employer',
            'viewFrom': view
          });
        };

        vm.listApplied = function (jobData) {
          if (jobData.jobAppliedCount > 0) {
            var modalInstance = $uibModal.open({
              templateUrl: 'views/public/appliedCandidates.html',
              controller: 'AppliedCandidatesCtrl',
              resolve: {
                item: function() {
                  return jobData;
                }
              },
              size: 'lg'
            });
          }
        };

        vm.switchTab = function (view) {
          $('.jobsCategory .active').removeClass('active');
          $('#' + view).addClass('active');
          getJobs(view);
        };

        vm.switchTabQuickLinks = function (view) {
          $('.empSuggestions .active').removeClass('active');
          $('#' + view).addClass('active');
          getEmployers(view);
        };

        vm.loadMoreYouMayKnow = function() {
          $state.go('employer.youMayKnow');
        };

        vm.redirectToEmployer = function(connection) {
          // $state.go('employer.connectionDetails', {
          //   'connectionId': emp.employeeId
          // });

          $state.go('employer.connectionDetails',{'connectionId': connection.employerId});
        };

        vm.loadMoreRecentSigned = function() {
          $state.go('employer.recentSignedIn');
        };

        vm.loadMoreRecentJobs = function() {
          $state.go('employer.recentJobs');
        };

        vm.loadMorePublicJobs = function() {
          vm.initializeJobs();
        };

        vm.loadMoreMyJobs = function() {
          getMyPostedJobs();
        };

        vm.loadMoreConnectionJobs = function() {
          getConnectionPostedJobs();
        };

        vm.loadMoreAppliedJobs = function() {
          getMyAppliedJobs();
        };

        vm.redirectToMycandidatesWithActiveData = function() {
          $state.go('employer.myCandidates', {'candidates': 'active'});
        };

        vm.initializeJobs();
        vm.initializeEmployers();
        vm.initializeRecentJobs();
      }]);
})();
