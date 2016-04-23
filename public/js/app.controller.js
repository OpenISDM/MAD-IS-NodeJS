(function() {
  'use strict';

  angular
    .module('MAD')
    .controller('MainController', MainController);

  function MainController($rootScope, $scope, $location, $http, leafletData) {

    angular.extend($scope, {
      center: {
        autoDiscover: true,
        zoom: 14
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
      console.log('leafletDirectiveMap.locationfound');

      $scope.markers['userLocation'] = {
        lat: args.leafletEvent.latlng.lat,
        lng: args.leafletEvent.latlng.lng,
        focus: true,
        draggable: true,
        distance: 0,
        message: 'Here you are!',
        icon: {
          type: 'awesomeMarker',
          iconColor: 'white',
          icon: 'star',
          markerColor: 'red',
          spin: true,
          prefix: 'fa'
        }
      };

      $http({
        url: 'api/poi/proximity',
        method: "GET",
        params: {
          lat: args.leafletEvent.latlng.lat,
          lng: args.leafletEvent.latlng.lng,
          dist: 10
        }
      }).success(function(data, status) {
        console.log(data);
        for (var index in data) {
          $scope.markers[data[index].key] = {
            lat: data[index].latitude,
            lng: data[index].longitude,
            distance: data[index].distance,
            draggable: true,
            message: data[index].key
          }
        }
      });

    });

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
      // $scope.routingControl.hide();
    });

    $scope.moveToMarker = function(key) {
      var coordinates = $scope.markers[key];
      $scope.markers[key].focus = true;
      $scope.routingControl.getPlan().setWaypoints([
        L.latLng($scope.markers['userLocation'].lat, $scope.markers['userLocation'].lng),
        L.latLng(coordinates.lat, coordinates.lng)
      ]);
    };
  }

})();
