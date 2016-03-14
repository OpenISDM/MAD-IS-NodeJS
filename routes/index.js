var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mobile Assistant for Disaster' });
});

/* GET home page. */
router.get('/:name', function(req, res, next) {
  var name = req.params.name;
  res.render(name);
});

module.exports = router;
