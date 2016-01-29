var express = require('express');
var app = express();
var request = require('request');
var fs = require('fs');
var path = require('path');
var env = process.env.NODE_ENV || "development"

// for Heroku, make sure the key is right
if (env === 'production') {
  key = process.env.key;
  search_id = process.env.search_id;
} else {
  key = fs.readFileSync('./key.txt', 'utf8');
  search_id = fs.readFileSync('./search_id.txt', 'utf8');
}

// Setting public folder views
app.use(express.static(__dirname + '/dist', { extensions: ['html'] }));

// Setting templating engine
app.set('view engine', 'ejs');


// 404s!
app.use(function(req,res){
  res.sendFile(path.resolve(__dirname, 'dist/404.html'));
});

// Server Start
app.listen(process.env.PORT || 3000, function(){
  console.log('✨🎆✨ Yasssss we running on port: %d in %s mode', this.address().port, app.settings.env);
});