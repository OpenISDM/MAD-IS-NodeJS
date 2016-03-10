var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/poi', function(req, res) {
  fs.readFile(__dirname + "/public/geojson/TAIPEI_Shelters.json", 'utf8', function(err, data) {
    debugger;
    console.log(__dirname);
    console.log(data);
    res.end(data);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
