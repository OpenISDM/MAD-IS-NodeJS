var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var path    = require('path');

/* GET users listing. */
router.get('/poi', function(req, res, next) {
  var file = path.join(process.cwd(), '/public/geojson/TAIPEI_Shelters.json');

  fs.readFile(file, 'utf8', function(err, data) {
    console.log(data)
    res.end(data);
  });
});

module.exports = router;
