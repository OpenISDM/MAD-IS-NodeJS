(function() {
  'use strict';

  angular
    .module('MAD')
    .controller('MainController', MainController);

  function MainController($rootScope, $scope, $location, $http, leafletData) {

    angular.extend($scope, {
      center: {
        autoDiscover: true,
        zoom: 11
      },
      markers: {},
      layers: {
        baselayers: {
          osm: {
            name: 'OpenStreetMap',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            type: 'xyz'
          },
        },
        overlays: {}
      },
      defaults: {
        scrollWheelZoom: false,
        markerZoomAnimation: true
      }
    });

    $scope.$on('leafletDirectiveMap.locationfound', function(event, args) {
      $scope.markers['userLocation'] = {
        lat: args.leafletEvent.latlng.lat,
        lng: args.leafletEvent.latlng.lng,
        focus: true,
        draggable: true,
        message: 'Here you are!',
        icon: {
          type: 'awesomeMarker',
          iconColor: 'white',
          icon: 'star',
          markerColor: 'blue',
          spin: true,
          prefix: 'fa'
        }
      };

      leafletData.getMap().then(function(map) {
        console.log('lealetData.getMap()');
        $scope.routingControl = L.Routing.control({
          waypoints: [],
          createMarker: function() {
            return null;
          },
          routeWhileDragging: true,
          fitSelectedRoutes: 'fit'
        }).addTo(map);
      });
    });

    $scope.moveToMarker = function(index) {
      var coordinates = $rootScope.geojson.data.features[index].geometry.coordinates;
      $scope.routingControl.getPlan().setWaypoints([
        L.latLng($scope.markers['userLocation'].lat, $scope.markers['userLocation'].lng),
        L.latLng(coordinates[1], coordinates[0])
      ]);
    };
  }

})();
