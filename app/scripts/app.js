(function(){
  'use strict';

  angular
    .module('scApp', [
      'ngAnimate',
      'ngAria',
      'ngCookies',
      'ngMessages',
      'ui.bootstrap',
      'ngResource',
      'ngSanitize',
      'ngTouch',
      'ui.router',
      'angularMoment',
      'ngFileUpload',
      'angularjs-dropdown-multiselect',
      'ngTagsInput',
      'ngMap',


      'scApp.controllers',
      'scApp.routes',
      'scApp.services',
      'scApp.filters',
      'scApp.constants',
      'scApp.directives'
    ]);

    angular.module('scApp.controllers', []);
    angular.module('scApp.routes', []);
    angular.module('scApp.services', []);
    angular.module('scApp.filters', []);
    angular.module('scApp.constants', []);
    angular.module('scApp.directives' ,[]);
})();
