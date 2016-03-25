(function() {
  'use strict';

  angular
    .module('MAD')
    .run(runBlock);

  function runBlock(GetJson, $rootScope) {
    // Get the countries geojson data from a JSON
    var onSuccess = function(response) {
      angular.extend($rootScope, {
        data: response.data
          // geojson: {
          //   data: data,
          //   onEachFeature: function(feature, layer) {
          //     var result = '';
          //     for (var index in feature.properties) {
          //       result = result + index + ':' + feature.properties[index] + '<br>';
          //     }
          //     layer.bindPopup(result);
          //   }
          // }
      });
    };
    GetJson.then(onSuccess);
  }

})();
