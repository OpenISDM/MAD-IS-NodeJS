(function() {
  'use strict';

  angular
    .module('MAD')
    .controller('MainController', MainController);

  function MainController($rootScope, $scope, $location, GetJson) {
    // Center Map and Zoom
    angular.extend($scope, {
      center: {
        autoDiscover: true,
        zoom: 14
      },
      defaults: {
        scrollWheelZoom: false,
        markerZoomAnimation: true
      }
    });

    $scope.moveToMarker = function(index) {
      var coordinates = $rootScope.geojson.data.features[index].geometry.coordinates;
      var centerHash = coordinates[1] + ":" + coordinates[0] + ":15";

      $location.search({
        c: centerHash
      });

    };

    // 'Scroll' screen
    $rootScope.$on('$GET_JSON_SUCCESS', function() {
      var scrollItems = [];
      var itemCounts = $rootScope.geojson.data.features.length;

      for (var index in $rootScope.geojson.data.features) {
        scrollItems.push($rootScope.geojson.data.features[index].properties.name);
      }
      $scope.scrollItems = scrollItems;
    });

    $scope.bottomReached = function() {
      /* global alert: false; */
      alert('Congrats you scrolled to the end of the list!');
    };
  }

})();
