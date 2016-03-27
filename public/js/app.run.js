(function() {
  'use strict';

  angular
    .module('MAD')
    .run(runBlock);

  function runBlock(GetJson, $rootScope) {
    // Get the countries geojson data from a JSON
    var onSuccess = function(response) {
      var data = response.data;

      var aicon = {
        icon: 'heart',
        markerColor: 'red',
        prefix: 'fa',
        iconColor: 'white'
      };

      angular.extend($rootScope, {
        geojson: {
          data: data,
          onEachFeature: function(feature, layer) {
            var result = '';
            for (var index in feature.properties) {
              result = result + index + ':' + feature.properties[index] + '<br>';
            }
            layer.bindPopup(result);
          },
          pointToLayer: function(feature, latlng) {
            var marker = new L.marker(latlng, {
              icon: L.AwesomeMarkers.icon(aicon)
            });
            return marker;
          }
        }
      });
    };
    GetJson.then(onSuccess);
  }

})();
