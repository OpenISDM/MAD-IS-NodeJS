(function() {
  'use strict';

  angular
    .module('MAD')
    .controller('MainController', MainController);

  function MainController($rootScope, $scope, GetJson) {
    // Center Map and Zoom
    angular.extend($scope, {
      center: {
        autoDiscover: true,
        zoom: 12
      },
      defaults: {
        scrollWheelZoom: false
      }
    });

    // 'Scroll' screen
    $rootScope.$on('$GET_JSON_SUCCESS', function() {
      var scrollItems = [];
      console.log($rootScope.geojson.data.features);
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
