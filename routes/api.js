var express = require('express');
var fs = require('fs');
var path = require('path');
var redis = require("redis");
var config = require("../config");

var router = express.Router();

var client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port
});

client.auth(config.redis.pass, function() {
  console.log("Pass!")
});

var geo = require('georedis').initialize(client, {
  nativeGeo: true
})

/* GET POI listing. */
router.get('/poi', function(req, res, next) {

  var file = path.join(process.cwd(), '/public/geojson/TAIPEI_Shelters.json');

  fs.readFile(file, 'utf8', function(err, data) {
    console.log(data)
    res.end(data);
  });

});

router.get('/poi/proximity/', function(req, res) {
  var q = req.query;
  var badRequest = (
    q.lat == null ||
    q.lng == null ||
    q.dist == null
  );

  console.log(q);

  if (badRequest) {
    res.status(400).send('400 Bad Request');
  } else {

    var point = {
      latitude: q.lat,
      longitude: q.lng
    };

    var options = {
      withCoordinates: true, // Will provide coordinates with locations, default false
      withHashes: true, // Will provide a 52bit Geohash Integer, default false
      withDistances: true, // Will provide distance from query, default false
      order: true, // or 'DESC' or true (same as 'ASC'), default false
      units: 'km', // or 'km', 'mi', 'ft', default 'm'
      count: 50, // Number of results to return, default undefined
      accurate: true // Useful if in emulated mode and accuracy is important, default false
    }

    geo.nearby(point, q.dist, options, function(err, locations) {
      if (err) console.error(err)
      else res.json(locations)
        // res.send("asdf");
    })
  }

});

module.exports = router;
