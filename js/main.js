var request = new XMLHttpRequest();
var resultBuilder = require('./resultBuilder');

// var keys = require('./keybindings');
// var clicks = require('./clickbindings');

request.open('GET', '/json-list', true);

request.onload = function() {
  'use strict';
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText).items;

    var results = [];

    for (var i = 0; i < data.length; i++) {
      results.push({
        title: data[i].title,
        image: data[i].link,
        thumb: data[i].image.thumbnailLink,
        imageHeight: data[i].image.height,
        imageWidth: data[i].image.width,
        link: data[i].image.contextLink
      });
    }

    // Passing results into resultBuilder to make the page
    resultBuilder(results);

  } else {
    console.log('Something went wrong!');
  }
};

request.onerror = function() {
  'use strict';
  document.querySelector('main').innerHTML = 'connection error';
};

request.send();