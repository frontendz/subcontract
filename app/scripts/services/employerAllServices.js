(function(){
  'use strict';
  angular.module('scApp.services')
    .service('EmployerServices', ['$http', 'API_URL','AuthService', function($http, API_URL ,AuthService) {
      return {
        // Registering Employer
        setEmployer : function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/employer/registration',
            data: JSON.stringify(requestParams),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        setEmployerWithInvitation : function(requestParams,inviteToken, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/employer/registration?inviteToken=' + inviteToken,
            data: JSON.stringify(requestParams),
            headers: {
              // 'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        setFullEmployerProfile : function(requestParams, employerId, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId,
            data: JSON.stringify(requestParams),
            headers: {
              'Content-Type' : 'application/json',
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        connectionWithEmployer : function(employerId, networkId, action, employerTo, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/network/' + networkId + '/trust?action=' + action + '&employerTo=' + employerTo,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        connectionDisconnect : function(employerId, networkId, action, employerTo, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/network/' + networkId + '/disconnect',
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        setBasicEmployerProfile : function(requestParams, employerId, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/profile',
            data: JSON.stringify(requestParams),
            headers: {
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getEmployerAllDetail: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getAllSkills: function(jobSkills) {
          return $http({
            method: 'GET',
            url: API_URL + 'v1/skill?name=' + jobSkills,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            return response.data;
          },
          function onError(response) {
            return response.data;
          });
        },

        getAllSkillsPromise: function(str) {
          return $http({
            method: 'GET',
            url: API_URL + 'v1/skill?name=' + str,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            return response.data;
          },
          function onError(response) {
            return response.data;
          });
        },

        getAllSkillsList: function(jobSkills, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/skill?name=' + jobSkills,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getAllSkillsListForEmpProfile: function(jobSkills, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/skill/info?name=' + jobSkills,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getJobsByEmployer: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/job?type=my',
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
              successCallback(response);
            },
            function onError(response) {
              errorCallback(response);
            });
          },

        getJobsById: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + requestParams.employerId + '/job/' + requestParams.jobId,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getSingleJobDetail: function(jobId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/job/' + jobId + '/details',
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        postNewJob: function(requestParams,  successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/employer/' + AuthService.getEmployerId() + '/job',
            data: JSON.stringify(requestParams),
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        postEditedJob: function(jobId, employerId, requestParams,  successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/job/' + jobId,
            data: requestParams,
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        addNewCandidate: function(requestParams,  successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/employer/' + AuthService.getEmployerId() + '/candidate',
            data: JSON.stringify(requestParams),
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        sendFeedback: function(fd, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/feedback',
            data: fd,
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        addResumeOnServer: function(fd, employerId, requestParams,  successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/file/' + employerId + '/upload/cv',
            data: fd,
            transformRequest: angular.identity,
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type': undefined
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        addResumeOnServerWithoutKey: function(fd, employerId, requestParams,  successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/file/' + employerId + '/upload',
            data: fd,
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        downloadParticularCandidateResume: function(candidateId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/file/' + candidateId + '/download',
            headers: {
              'authToken': AuthService.getToken(),
            },
            responseType: 'arraybuffer'
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        addCandidateQualification: function(employerId, candidateId, requestParams, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/' + candidateId + '/qualification',
            data: JSON.stringify(requestParams),
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        addCandidateProfession: function(employerId, candidateId, requestParams, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/' + candidateId + '/professional',
            data: JSON.stringify(requestParams),
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        addCandidateSkill: function(employerId, candidateId, requestParams, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/' + candidateId + '/skill',
            data: JSON.stringify(requestParams),
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        editBasicCandidateDetail: function(employerId, candidateId, requestParams,  successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/' + candidateId,
            data: JSON.stringify(requestParams),
            headers: {
              'authToken': AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewMyCandidates: function(userId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + userId + '/candidate',
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
            },
            function onError(response) {
              errorCallback(response);
          });
        },

        viewParticularCandidate: function(userId, candidateId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + userId + '/candidate/' + candidateId,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        activeOrInactive: function(employerId, candidateId, activeOrInactiveType, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/' + candidateId + '/' + activeOrInactiveType,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        placeOrOnBench: function(employerId, candidateId, placeOrOnBenchType, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/' + candidateId + '/' + placeOrOnBenchType,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        checkUserByEmail: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/checkuser?email=' + requestParams.email,
          })
          // $http.get('scripts/services/jsonFiles/myPostedJobs.json')
          .then(function onSuccess(response) {
            successCallback(response);
            },
            function onError(response) {
              errorCallback(response);
            });
          },

        viewMyPostedJobs: function(requestParams, loadMore, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + requestParams.employerId + '/job/my?pageNo=' + loadMore.pageNo + '&pageSize=' + loadMore.pageSize,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewRecruiterPostedJobs: function(requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + requestParams.employerId + '/team/' + requestParams.recruiterId + '/jobs',
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewParticularJob: function(employerId, jobId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/job/' + jobId,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        shareJob: function(jobId, email, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/job/' + jobId + '/share?email=' + email,
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewMyConnectionPostedJobs: function(employerId, loadMore, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/job/connection?pageNo=' + loadMore.pageNo + '&pageSize=' + loadMore.pageSize,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewMyAppliedJobs: function(requestParams, loadMore, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + requestParams.employerId + '/job/applied?pageNo=' + loadMore.pageNo + '&pageSize=' + loadMore.pageSize,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewPublicJobs: function(requestParams, loadMore, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + requestParams.userId + '/job?pageNo=' + loadMore.pageNo + '&pageSize=' + loadMore.pageSize,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getAllSignedInEmployer: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/network/request',
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        searchEmployer: function(employerId, searchStr, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/network/request?name=' + searchStr,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getRecentSignedInEmployer: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/recent',
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getAllEmployerDomainWise: function(employerId, record, successCallback, errorCallback) {
          var urlDummy = '';
          if (record === 'all') {
            urlDummy = API_URL + 'v1/employer/' + employerId + '/domain?record=all';
          }
          else {
            urlDummy = API_URL + 'v1/employer/' + employerId + '/domain';
          }
          $http({
            method: 'GET',
            url: urlDummy,
            headers: {
                'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        // Network all services
        sendNetworkRequest: function(employerId, requestParams, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/employer/' + employerId + '/network',
            data: JSON.stringify(requestParams),
            headers: {
                'authToken' : AuthService.getToken(),
                'Content-Type' : 'application/json'
            },
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        myConnectedNetwork: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/network?status=my',
            headers: {
                'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        sentNetworkRequest: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/network?status=sent',
            headers: {
                'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        pendingNetworkRequest: function(employerId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/network?status=pending',
            headers: {
                'authToken' : AuthService.getToken(),
            },
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        cancelNetworkRequest: function(employerId, networkId, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/network/' + networkId + '/cancel',
            headers: {
                'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        acceptNetworkRequest: function(employerId, networkId, successCallback, errorCallback) {
          $http({
            method: 'PUT',
            url: API_URL + 'v1/employer/' + employerId + '/network/' + networkId + '/accept',
            headers: {
              'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getIndustryLookup: function(successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/lookup/industrytype',
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        gelAllLookupData: function(successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/lookup/all',
            headers: {
                'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        getSearchedJobs: function(requestParams, loadMore, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/job/search?q=' + requestParams.query + '&pageNo=' + loadMore.pageNo + '&pageSize=' + loadMore.pageSize,
            headers: {
              'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        getSearchedJobsGlobal: function(requestParams, loadMore, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/job/search?q=' + requestParams.query + '&pageNo=' + loadMore.pageNo + '&pageSize=' + loadMore.pageSize,
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },


        getCandidatesBySkill: function(employerId, skillIds, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/search?skill=' + skillIds,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        getCandidatesBySkillAndFirstLastName: function(employerId, skillIds, searchBy, searchStr, successCallback, errorCallback) {
          var fURL = '';
          if (searchStr !== undefined) {
          if (searchBy === 'First Name') {
              fURL = API_URL + 'v1/employer/' + employerId + '/candidate/search?skill=' + skillIds + '&firstName=' + searchStr + '&lastName=';
            }
            else {
              fURL = API_URL + 'v1/employer/' + employerId + '/candidate/search?skill=' + skillIds + '&firstName=&lastName=' + searchStr;
            }
          }
          else {
              fURL = API_URL + 'v1/employer/' + employerId + '/candidate/search?skill=' + skillIds;
          }

          $http({
            method: 'GET',
            url: fURL,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        getCandidatesBySkillAndExperience: function(employerId, skillIds, expFrom, expTo, jobId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/search?skill=' + skillIds + '&expFrom=' + expFrom + '&expTo=' + expTo + '&jobId=' + jobId,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        applyCandidatesForJob: function(jobId, requestParams, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url: API_URL + 'v1/job/' + jobId + '/apply',
            data : JSON.stringify(requestParams),
            headers: {
              'Content-type': 'application/json',
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        viewMyAppliedCandidates: function(employerId, jobId, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/candidate/job/' + jobId,
            headers: {
              'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },function onError(response){
            errorCallback(response);
          });
        },

        getSkillByName: function (requestParams, successCallback, errorCallback) {
          $http({
            method: 'GET',
            url: API_URL + 'v1/skill?name=' + requestParams.name,
            headers: {
              'authToken' : AuthService.getToken(),
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },function onError(response){
            errorCallback(response);
          });
        },

        addInviteTeam: function(employerId, requestParams, successCallback, errorCallback) {
          $http({
            method: 'POST',
            url : API_URL + 'v1/employer/' + employerId + '/team',
            data : JSON.stringify(requestParams),
            headers : {
              'authToken' : AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          })
          .then(function onSuccess(response){
              successCallback(response);
          },
          function onError(response){
              errorCallback(response);
          });
        },

        viewTeamMembers : function(employerId, successCallback, errorCallback){
          $http({
            method : 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/team' ,
            headers : {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response){
            successCallback(response);
          },function onError(response){
            errorCallback(response);
          });
        },

        countStatastics : function(employerId, successCallback, errorCallback){
          $http({
            method : 'GET',
            url: API_URL + 'v1/employer/' + employerId + '/count' ,
            headers : {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response){
            successCallback(response);
          },function onError(response){
            errorCallback(response);
          });
        },

        changeTeamMemberPassword : function(employerId, teamMemberId, requestParams, successCallback, errorCallback){
          $http({
            method : 'PUT',
            url : API_URL +'v1/employer/' + employerId + '/team/' + teamMemberId + '/password?newPW=' + requestParams.password,
            headers: {
              'authToken' : AuthService.getToken()
            }
          })
          .then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        editTeamMembersDetail : function(employerId, teamMemberId, requestParams, successCallback, errorCallback){
          $http({
            method :'PUT',
            url : API_URL +'v1/employer/' + employerId + '/team/' + teamMemberId,
            data :JSON.stringify(requestParams),
            headers : {
              'authToken' : AuthService.getToken(),
              'Content-Type' : 'application/json'
            }
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },
        changeEmployerPassword : function(oldPass, newPass, userId, successCallback, errorCallback){
          $http({
            method :'PUT',
            url : API_URL +'v1/user/' + userId +  '/changepassword?oldpw=' + oldPass + '&newpw=' + newPass,
            headers : {
              'authToken' : AuthService.getToken(),
            }
          }).then(function onSuccess(response) {
            successCallback(response);
          },
          function onError(response) {
            errorCallback(response);
          });
        },

        inviteFriend : function(requestParams, successCallback, errorCallback){
          $http({
            method :'GET',
            url : API_URL +'v1/user/invite?name=' + requestParams.friendName + '&email=' + requestParams.email,
            headers : {
              'authToken' : AuthService.getToken(),
            }
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
