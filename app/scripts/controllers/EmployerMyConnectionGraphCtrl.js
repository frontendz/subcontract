(function() {
'use strict';

angular.module('scApp.controllers')
  .controller('EmployerMyConnectionGraphCtrl', ['$state', '$scope', 'EmployerServices', 'AuthService', 'CustomAlertService', 'NgMap', '$timeout',
    function ($state, $scope, EmployerServices, AuthService, CustomAlertService, NgMap, $timeout) {
    var vm = this;
    var positions = [];

    vm.showData = function() {
      alert(this.data.foo);
    }

    vm.initialize = function() {
      vm.myAvailableConnection = true;

      vm.employerId = AuthService.getEmployerId();
      // Calling my Connected Network list
      EmployerServices.myConnectedNetwork(vm.employerId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
    };

    var geocoder = '';
    function getLatitudeLongitude(callback, address) {
        geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[0]);
                }
            });
        }
    }




    function showResult(result) {
    }

    vm.onSuccessMyConnectedNetwork = function(response) {
      vm.result = response.data;
      // var geocoder =  new google.maps.Geocoder();
      vm.data = [];

      var tempArr = [];
      var posObj = {};
      _.each(vm.result, function(data) {
        var tempPosArr = [];
        getLatitudeLongitude(function (result) {
          var tempPosArr = [];
          tempPosArr.push(result.geometry.location.lat());
          tempPosArr.push(result.geometry.location.lng());

          var posObj = {
            pos : tempPosArr
          };
          positions.push(posObj);
        }, data.location)

      });

    };

    $scope.sortingFn = function( myConnectedEmployer ) {
        return myConnectedEmployer.name.toLowerCase();
    }
    vm.onErrorMyConnectedNetwork = function(response) {
    };

    vm.cancelNetwork = function(employerDetail) {
      EmployerServices.cancelNetworkRequest(employerDetail.employerId, employerDetail.employerNetworkId, vm.onSuccessCancelNetwork, vm.onErrorCancelNetwork);
    }

    vm.onSuccessCancelNetwork = function(response) {
      if (response.status === 200) {
        CustomAlertService.alert('Connection is cancelled');
        EmployerServices.myConnectedNetwork(vm.employerId, vm.onSuccessMyConnectedNetwork, vm.onErrorMyConnectedNetwork);
      }
    };

    vm.onErrorCancelNetwork = function() {

    };

    vm.redirectSignInEmployers = function() {
      $state.go('employer.recentSignedIn');
    };

    vm.viewConnection = function (connection) {
      $state.go('employer.connectionDetails',{'connectionId': connection.employerId});
    };

    vm.initialize();
  }]);
})();
