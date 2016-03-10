var app = angular.module('MAD', [
  'ngRoute',
  'mobile-angular-ui',
  'leaflet-directive',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'
  // it is at a very beginning stage, so please be careful if you like to use
  // in production. This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);


// app.run(function($transform) {
//   window.$transform = $transform;
// });

app.run(['GetJson', '$rootScope', function(GetJson, $rootScope) {
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
  GetJson().then(onSuccess);
}]);

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home.html',
    reloadOnSearch: false
  });
  $routeProvider.when('/scroll', {
    templateUrl: 'scroll.html',
    reloadOnSearch: false
  });
});


app.factory('GetJson', function($http) {
  return function() {
    return $http.get('/poi');
  };
});

//
// For this trivial demo we have just a unique MainController
// for everything
//
app.controller('MainController', ['$rootScope', '$scope', 'GetJson', function($rootScope, $scope, GetJson) {

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

}]);
