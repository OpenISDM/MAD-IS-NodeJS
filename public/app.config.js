(function() {
  'use strict';

  angular
    .module('MAD')
    .config(config);

  function config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'map.html',
      reloadOnSearch: false
    });
    $routeProvider.when('/scroll', {
      templateUrl: 'scroll.html',
      reloadOnSearch: false
    });
  }

})();
