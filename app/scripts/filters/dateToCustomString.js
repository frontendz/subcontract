(function(){
  'use strict';
  angular.module('scApp.filters')
  .filter('dateToCustomString', ['moment', function(moment) {
    return function(dateInput) {
      return moment(dateInput).format('DD-MMM-YYYY');
    };
  }])
  .filter('num', function() {
    return function(input) {
      return parseInt(input, 10);
    };
  })
  .filter('splitValues', ['_', function(_) {
    return function(input) {
        if (input && input.length) {
        var str = '';
        _.each(input, function(data) {
          str += data + ', ';
        });
        str = str.substring(0, str.length - 2);
        return str
      }
      else {
        return '';
      }
    };
  }]);
})();
