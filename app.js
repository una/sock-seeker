'strict mode';

const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || "development";
const json, key, search_id;
const query = 'slacksocks';

// for production vs dev environment
// get the correct keys
if (env === 'production') {
  key = process.env.key;
  search_id = process.env.search_id;
} else {
  key = fs.readFileSync('./key.txt', 'utf8');
  search_id = fs.readFileSync('./search_id.txt', 'utf8');
}

// creating JSON list of results
// from Google search query
app.get('/json-list', function(req, res){
  request.get('https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + search_id + '&searchType=image&num=10&q=' + query,
  function(err, response, body) {
    json = JSON.parse(body);
    res.json(json);
  });
});

// Setting public folder views
app.use(express.static(__dirname + '/dist', { extensions: ['html'] }));

// Start server
app.listen(process.env.PORT || 3000, function(){
  console.log('✨🎆✨ Yasssss we running on port: %d in %s mode', this.address().port, app.settings.env);
});