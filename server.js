var express = require('express');
var path    = require('path');
var fs      = require('fs');
var app     = express();

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function getIndex(req, res) {
  res.render('index.html');
});

app.get('/poi', function getPoi(req, res) {
  var filePath = __dirname + '/public/geojson/TAIPEI_Shelters.json';
  fs.readFile(filePath, 'utf8', response);
  function response(err, data) {
    res.end(data);
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function listenPort() {
  console.log('Example app listening on port 3000!');
});
