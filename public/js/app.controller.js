(function() {
  'use strict';

  angular
    .module('MAD')
    .controller('MainController', MainController);

  function MainController($rootScope, $scope, $location, $http, leafletData) {

    angular.extend($scope, {
      center: {
        autoDiscover: true,
        zoom: 12
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

    $http({
      url: 'api/poi/proximity',
      method: "GET",
      params: {
        lat: 25.1291,
        lng: 121.5762,
        dist: 6
      }
    }).success(function(data, status) {
      for (var index in data) {
        $scope.markers[data[index].key] = {
          lat: data[index].latitude,
          lng: data[index].longitude,
          focus: true,
          draggable: true,
          message: data[index].key
        }
      }
    });

    $scope.$on('leafletDirectiveMap.locationfound', function(event, args) {
      console.log('leafletDirectiveMap.locationfound');
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
      console.log(args.leafletEvent.latlng.lat);

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

    $scope.moveToMarker = function(key) {
      var coordinates = $scope.markers[key];
      $scope.routingControl.getPlan().setWaypoints([
        L.latLng($scope.markers['userLocation'].lat, $scope.markers['userLocation'].lng),
        L.latLng(coordinates.lat, coordinates.lng)
      ]);
    };
  }

})();
