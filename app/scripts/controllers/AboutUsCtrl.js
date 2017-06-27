(function(){
  angular.module('scApp.controllers')
  .controller('AboutUsCtrl',['AuthService','EmployerServices', function(AuthService, EmployerServices){
    console.log("About Us controller");
     var vm = this;
     var publicJobPageNo = 0,
         publicJobPageSize = 25;

     vm.requestParams = {
       'userId': 281,
       //'employerId': AuthService.getEmployerId()
     };

     vm.loadPublicJobs = function(){
       vm.loadMorePublic = {
         'pageNo' : publicJobPageNo,
         'pageSize' : publicJobPageSize
       };
       EmployerServices.viewPublicJobs(vm.requestParams, vm.loadMorePublic, vm.onPublicJobSuccess, vm.onPublicJobError);
     };

     vm.onPublicJobSuccess = function(response){
       console.log("public response success", response);
     };

     vm.onPublicJobError = function(response){
      console.log("onPublicJobError");
    };




    vm.loadPublicJobs();
  }]);
})();
