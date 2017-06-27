(function(){
  'use strict';
  angular.module('scApp.routes')
    .config(['$stateProvider', function($stateProvider) {
      $stateProvider
        .state('home', {
          url: '',
          templateUrl: 'views/home.html',
          authenticate: false,
        })
        .state('about', {
          url: '/aboutUs',
          templateUrl: 'views/public/aboutUs.html',
          // controller : 'AboutUsCtrl',
          // controllerAs : 'aboutUsCtrl',
          authenticate: false,
        })
        .state('contact', {
          url: '/contactUs',
          controller: 'ContactUsCtrl',
          templateUrl: 'views/public/contactUs.html',
          authenticate: false,
        })
        .state('feedback', {
          url: '/feedback',
          templateUrl: 'views/public/feedback.html',
          controller: 'FeedbackCtrl',
          controllerAs: 'feedbackCtrl',
          authenticate: false,
        })
        .state('privacy', {
          url: '/privacyPolicy',
          templateUrl: 'views/public/privacyPolicy.html',
          authenticate: false,
        })
        .state('homeSearch', {
          url: '/homeSearch?selectedQuery:query',
          templateUrl: 'views/public/search.html',
          controller: 'HomeSearchCtrl',
          controllerAs: 'homeSearchCtrl',
          authenticate: false,
        })
        .state('askForDemo', {
          url: '/askForDemo',
          templateUrl: 'views/askForDemo.html',
          authenticate: false,
          controller: 'AskForDemoCtrl',
          controllerAs: 'askForDemoCtrl'
        })
        .state('forgotPasswordRegisteration', {
          url: '/forgotPassword',
          templateUrl: 'views/forgotPassword.html',
          authenticate: false,
          controller: 'ForgotPasswordCtrl'
        })
        .state('resetPasswordRegisteration', {
          url: '/resetPassword',
          templateUrl: 'views/resetPassword.html',
          authenticate: false,
          controller: 'ResetPasswordCtrl'
        })
        .state('employerRegisteration', {
          url: '/employers/registration',
          templateUrl: 'views/employer/employerRegisteration.html',
          authenticate: false,
          controller: 'EmployerRegisterationCtrl'
        })
        .state('employerTempProfile', {
          url: '/employers/basicProfile',
          templateUrl: 'views/employer/employerProfile.html',
          authenticate: true,
          controller: 'EmployerProfileCtrl',
          controllerAs: 'employerProfileCtrl'
        })
        .state('employeeCandidateProfile', {
          url: '/createCandidateProfile?selectedCandidateId:candidateId',
          templateUrl: 'views/employee/employeeFullProfile.html',
          controller: 'EmployeeFullProfileCtrl',
          controllerAs: 'employeeFullProfileCtrl',
          authenticate: true
        })
        .state('employer', {
          url: '/employer',
          abstract: true,
          templateUrl: 'views/employer/employerNavigation.html',
          controller: 'EmployerNavigationCtrl',
          authenticate: true
        })
        .state('employer.postJob', {
          url: '/postJob?selectedJobId:jobId',
          templateUrl: 'views/employer/employerPostJob.html',
          controller: 'EmployerAddNewJobCtrl',
          controllerAs: 'employerAddNewJobCtrl',
          authenticate: true
        })
        .state('employer.viewMyPostedJobs', {
          url: '/myPostedJobs',
          templateUrl: 'views/employer/employerMyPostedJobs.html',
          controller: 'EmployerMyPostedJobsCtrl',
          controllerAs: 'employerMyPostedJobsCtrl',
          authenticate: true
        })
        .state('employer.jobsByRecruiter', {
          url: '/jobsByRecruiter?selectedTeamMemberId:teamMemberId',
          templateUrl: 'views/employer/recruiterPostedJobs.html',
          controller: 'RecruiterPostedJobsCtrl',
          controllerAs: 'recruiterPostedJobsCtrl',
          authenticate: true
        })
        .state('employer.viewMyConnectionPostedJobs', {
          url: '/myConnectionPostedJobs',
          templateUrl: 'views/employer/employerMyConnectionJobPost.html',
          controller: 'EmployerMyConnectionJobPostCtrl',
          controllerAs: 'employerMyConnectionJobPostCtrl',
          authenticate: true
        })
        .state('employer.employerCandidateDetail', {
          url: '/viewCandidateDetail?selectedEmployerId:empId&?selectedCandidateId:candidateId',
          templateUrl: 'views/employer/employerCandidateDetail.html',
          controller: 'EmployerCandidateDetailsCtrl',
          controllerAs: 'employerCandidateDetailsCtrl',
          authenticate: true
        })
        .state('employer.viewPublicJobs', {
          url: '/publicJobs',
          templateUrl: 'views/employer/employerPublicJobs.html',
          controller: 'EmployerPublicJobsCtrl',
          controllerAs: 'employerPublicJobsCtrl',
          authenticate: true
        })
        .state('employer.addNewCandidate', {
          url: '/addCandidate?selectedCandidateId:candidateId',
          templateUrl: 'views/employer/employerAddNewCandidate.html',
          controller: 'EmployerAddNewCandidateCtrl',
          controllerAs: 'employerAddNewCandidateCtrl',
          authenticate: true
        })
        .state('employer.myCandidates', {
          url: '/myCandidates?selectedCandidatesTypes=candidates',
          templateUrl: 'views/employer/employerMyCandidates.html',
          controller: 'EmployerMyCandidatesCtrl',
          controllerAs: 'employerMyCandidatesCtrl',
          authenticate: true
        })
        .state('employer.inviteTeam', {
          url: '/inviteTeam',
          templateUrl: 'views/employer/inviteTeam.html',
          controller: 'InviteTeamCtrl',
          controllerAs: 'inviteTeamCtrl',
          authenticate: true
        })
        .state('employer.viewTeam', {
          url: '/viewTeam',
          templateUrl: 'views/employer/viewTeam.html',
          controller: 'ViewTeamCtrl',
          controllerAs: 'viewTeamCtrl',
          authenticate: true
        })
        .state('employer.myConnection', {
          url: '/myConnection',
          templateUrl: 'views/employer/employerMyConnection.html',
          controller: 'EmployerMyConnectionCtrl',
          controllerAs: 'employerMyConnectionCtrl',
          authenticate: true
        })
        .state('employer.myConnectionGraph', {
          url: '/myConnectionGraph',
          templateUrl: 'views/employer/employerMyConnectionGraph.html',
          controller: 'EmployerMyConnectionGraphCtrl',
          controllerAs: 'employerMyConnectionGraphCtrl',
          authenticate: true
        })
        .state('employer.recentSignedIn', {
          url: '/recentSignedInEmployers',
          templateUrl: 'views/employer/employerRecentlySignedIn.html',
          controller: 'EmployerRecentlySignedInCtrl',
          controllerAs: 'employerRecentlySignedInCtrl',
          authenticate: true
        })
        .state('employer.youMayKnow', {
          url: '/youMayKnow',
          templateUrl: 'views/employer/employerYouMayKnow.html',
          controller: 'EmployerYouMayKnowCtrl',
          controllerAs: 'employerYouMayKnowCtrl',
          authenticate: true
        })
        .state('employer.sentConnectionRequest', {
          url: '/sentNetworkRequest',
          templateUrl: 'views/employer/employerSentConnectionRequest.html',
          controller: 'EmployerSentConnectionRequestCtrl',
          controllerAs: 'employerSentConnectionRequestCtrl',
          authenticate: true
        })
        .state('employer.pendingNetworkRequest', {
          url: '/pendingNetworkRequest',
          templateUrl: 'views/employer/employerPendingNetworkRequest.html',
          controller: 'EmployerPendingNetworkRequestCtrl',
          controllerAs: 'employerPendingNetworkRequestCtrl',
          authenticate: true
        })
        .state('employer.myFullProfile', {
          url: '/myFullProfile',
          templateUrl: 'views/employer/employerFullProfile.html',
          controller: 'EmployerFullProfileCtrl',
          controllerAs: 'employerFullProfileCtrl',
          authenticate: true
        })
        .state('employer.changePassword', {
          url: '/changePassword',
          templateUrl: 'views/employer/employerChangePassword.html',
          controller: 'EmployerChangePasswordCtrl',
          controllerAs: 'employerChangePasswordCtrl',
          authenticate: true
        })
        .state('employer.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/employer/employerDashboard.html',
          controller: 'EmployerDashboard',
          controllerAs: 'employerDashboard',
          authenticate: true
        })
        .state('employer.recentJobs', {
          url: '/recentJobs',
          templateUrl: 'views/employer/employerRecentJobs.html',
          controller: 'EmployerRecentJobsCtrl',
          controllerAs: 'employerRecentJobsCtrl',
          authenticate: true
        })
        .state('employer.search', {
          url: '/search?query',
          templateUrl: 'views/employer/employerSearch.html',
          controller: 'EmployerSearchCtrl',
          controllerAs: 'searchCtrl',
          authenticate: true
        })
        .state('employer.connectionDetails', {
          url: '/myConnection/:connectionId',
          templateUrl: 'views/employer/connectionDetails.html',
          controller: 'EmployerViewConnection',
          controllerAs: 'connectionCtrl',
          authenticate: true
        })
        .state('employer.searchResume', {
          url: '/resume',
          templateUrl: 'views/employer/employerSearchResume.html',
          controller: 'EmployerSearchResume',
          controllerAs: 'resumeSearchCtrl',
          authenticate: true
        })
        .state('employer.listTrusted', {
          url: '/trusted/all',
          templateUrl: 'views/employer/employerListAllTrusted.html',
          controller: 'EmployerRequestManagement',
          controllerAs: 'trustedRequests',
          authenticate: true
        })
        .state('employer.pendingTrusted', {
          url: '/trusted/pending',
          templateUrl: 'views/employer/employerListAllPendingTrusted.html',
          controller: 'EmployerRequestManagement',
          controllerAs: 'listPending',
          authenticate: true
        })
        .state('employer.sentTrusted', {
          url: '/trusted/sent',
          templateUrl: 'views/employer/employerListAllSentTrusted.html',
          controller: 'EmployerRequestManagement',
          controllerAs: 'sentRequest',
        })
        .state('employer.viewJob', {
          url: '/viewjob/:jobId?selectedUserType:userType/:viewFrom',
          templateUrl: 'views/public/viewJob.html',
          controller: 'ViewJobCtrl',
          controllerAs: 'viewJobCtrl',
          authenticate: false
        })
        .state('viewSingleJob', {
          url: '/viewSingleJob/:employerId/:jobId',
          templateUrl: 'views/public/viewSingleJob.html',
          controller: 'ViewSingleJobCtrl',
          controllerAs: 'viewSingleJobCtrl',
          authenticate: false
        })
        // Employee Routes
        .state('employeeRegisteration', {
          url: '/employee/employeeRegisteration',
          templateUrl: 'views/employee/employeeRegistration.html',
          authenticate: false,
          controller: 'EmployeeRegistrationCtrl',
          controllerAs: 'employeeRegistrationCtrl'
        })
        .state('fullProfile', {
          url: '/employee/fullProfile',
          templateUrl: 'views/employee/employeeFullProfile.html',
          controller: 'EmployeeFullProfileCtrl',
          authenticate: true
        })
        .state('employee', {
          url: '/employee',
          abstract:true ,
          templateUrl: 'views/employee/employeeNavigation.html',
          controller: 'EmployeeNavigationCtrl',
          authenticate: true
        })
        .state('employee.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/employee/employeeDashboard.html',
          controller: 'EmployeeDashboardCtrl',
          controllerAs: 'employeeDashboardCtrl',
          authenticate: true
        })
        .state('employee.appliedJobs', {
          url: '/appliedJobs',
          templateUrl: 'views/employee/employeeTotalJobsApplied.html',
          controller: 'EmployeeJobAppliedCtrl',
          controllerAs: 'employeeJobAppliedCtrl',
          authenticate: true
        })
        .state('employee.recentMoreJobs', {
          url: '/recentMoreJobs',
          templateUrl: 'views/employee/employeeRecentMoreJobs.html',
          controller: 'EmployeeJobRecentCtrl',
          controllerAs: 'employeeJobRecentCtrl',
          authenticate: true
        })
        .state('employee.suggestedJobs', {
          url: '/suggestedJobs',
          templateUrl: 'views/employee/employeeSuggestedJobs.html',
          controller: 'EmployeeSuggestedJobCtrl',
          controllerAs: 'employeeSuggestedJobCtrl',
          authenticate: true
        })
        .state('employee.viewJob', {
          url: '/viewjob/:jobId?selectedUserType:userType',
          templateUrl: 'views/public/viewJob.html',
          controller: 'ViewJobCtrl',
          controllerAs: 'viewJobCtrl',
          authenticate: true
        })
        .state('employee.viewAppliedJob', {
          url: '/viewAppliedJob/:jobId?selectedUserType:userType',
          templateUrl: 'views/public/viewAppliedJob.html',
          controller: 'ViewAppliedJobCtrl',
          controllerAs: 'viewAppliedJobCtrl',
          authenticate: true
        })
        .state('employee.searchLocation', {
          url: '/searchByLocation',
          templateUrl: 'views/employee/employeeSearchByLocation.html',
          controller: 'EmployeeSearchByLocationCtrl',
          controllerAs: 'employeeSearchByLocationCtrl',
          authenticate: true
        })
        .state('employee.searchSkills', {
          url: '/searchBySkills',
          templateUrl: 'views/employee/employeeSearchBySkills.html',
          controller: 'EmployeeSearchBySkillsCtrl',
          controllerAs: 'employeeSearchBySkillsCtrl',
          authenticate: true
        })
        .state('employee.searchCompany', {
          url: '/searchByCompany',
          templateUrl: 'views/employee/employeeSearchByCompany.html',
          controller: 'EmployeeSearchByCompanyCtrl',
          controllerAs: 'employeeSearchByCompanyCtrl',
          authenticate: true
        })
        .state('employee.searchEmployers', {
          url: '/searchByEmployers',
          templateUrl: 'views/employee/employeeSearchByEmployers.html',
          controller: 'EmployeeSearchByEmployersCtrl',
          controllerAs: 'employeeSearchByEmployersCtrl',
          authenticate: true
        })
        .state('employee.searchForJobs', {
          url: '/searchForJobs',
          templateUrl: 'views/employee/employeeSearchForJobs.html',
          controller: 'EmployeeSearchForJobsCtrl',
          controllerAs: 'employeeSearchForJobsCtrl',
          authenticate: true
        })
        ;
    }])
    .factory('sessionRecoverer', ['$q', '$injector', function($q, $injector) {
        var sessionRecoverer = {
            response: function (response) {
              $('#mydiv').hide();
              return response || $q.when(response);
            },
            responseError: function(response) {
              // Session has expired
              if (response.status === 401){
                alert('Something went wrong. Please login again.');
                var stateService = $injector.get('$state');
                stateService.go('home');
              }
              return (response);
            },
            request: function (config) {
              $('#mydiv').hide();
              return config || $q.when(config);
           },
            requestError: function(request){
              $('#mydiv').hide();
              return $q.reject(request);
            },
        };
        return sessionRecoverer;
    }])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('sessionRecoverer');
        var spinnerFunction = function (data, headersGetter) {
            // todo start the spinner here
            //alert('start spinner');
            $('#mydiv').show();
            return data;
        };
        $httpProvider.defaults.transformRequest.push(spinnerFunction);
    }])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    // .factory('myHttpInterceptor', function ($q, $window) {
    //     return function (promise) {
    //         return promise.then(function (response) {
    //             // do something on success
    //             // todo hide the spinner
    //             //alert('stop spinner');
    //             $('#mydiv').hide();
    //             return response;
    //
    //         }, function (response) {
    //             // do something on error
    //             // todo hide the spinner
    //             //alert('stop spinner');
    //             $('#mydiv').hide();
    //             return $q.reject(response);
    //         });
    //     };
    // })
    // .config(function ($httpProvider) {
    //     $httpProvider.interceptors.push('myHttpInterceptor');
    //     var spinnerFunction = function (data, headersGetter) {
    //         // todo start the spinner here
    //         //alert('start spinner');
    //         $('#mydiv').show();
    //         return data;
    //     };
    //     $httpProvider.defaults.transformRequest.push(spinnerFunction);
    // })





    // .config(['$compileProvider',
    //   function ($compileProvider) {
    //     $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    //   }
    // ])
    .run(['$rootScope', '$state', 'AuthService', '$window', '$uibModalStack',
      function($rootScope, $state, AuthService, $window, $uibModalStack) {
      $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {
          $uibModalStack.dismissAll();
          $rootScope.alerts = [];
          if (toState.authenticate) {
            if (!AuthService.isLoggedIn()) {
              $state.go('home');
              event.preventDefault();
            }
          }
      });

      $rootScope.$on('$stateChangeSuccess', function() {
         document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
    }]);
})();
