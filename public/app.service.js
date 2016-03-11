(function() {
  'use strict';

  angular
    .module('MAD')
    .factory('GetJson', GetJson);

  function GetJson($http) {
    return $http.get('/poi');
  }
})();
