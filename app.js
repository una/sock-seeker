var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || "development";
var json, key, search_id;
var query = 'cute+unicorn+socks';

// for Heroku, make sure the key is right
if (env === 'production') {
  key = process.env.key;
  search_id = process.env.search_id;
} else {
  key = fs.readFileSync('./key.txt', 'utf8');
  search_id = fs.readFileSync('./search_id.txt', 'utf8');
}

// creating json list of results
app.get('/json-list', function(req, res){
  request.get('https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + search_id + '&searchType=image&num=9&q=' + query,
  function(err, response, body) {
    json = JSON.parse(body);
    res.json(json);
  });
});

// Setting public folder views
app.use(express.static(__dirname + '/dist', { extensions: ['html'] }));

// Server Start
app.listen(process.env.PORT || 3000, function(){
  console.log('✨🎆✨ Yasssss we running on port: %d in %s mode', this.address().port, app.settings.env);
});