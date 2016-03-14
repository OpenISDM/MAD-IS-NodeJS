(function() {
  'use strict';

  angular
    .module('MAD')
    .run(runBlock);

  function runBlock(GetJson, $rootScope) {
    // Get the countries geojson data from a JSON
    var onSuccess = function(response) {
      var data = response.data;
      angular.extend($rootScope, {
        geojson: {
          data: data,
          onEachFeature: function(feature, layer) {
            var result = '';
            for (var index in feature.properties) {
              result = result + index + ':' + feature.properties[index] + '<br>';
            }
            layer.bindPopup(result);
          }
        }
      });
      $rootScope.$emit('$GET_JSON_SUCCESS');
    };
    GetJson.then(onSuccess);
  }

})();
