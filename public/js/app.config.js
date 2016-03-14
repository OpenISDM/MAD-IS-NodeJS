(function() {
  'use strict';

  angular
    .module('MAD')
    .config(config);

  function config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'map',
      reloadOnSearch: false
    });
    $routeProvider.when('/scroll', {
      templateUrl: 'scroll',
      reloadOnSearch: false
    });
  }

})();
