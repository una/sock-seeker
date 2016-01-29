var request = new XMLHttpRequest();
// var keys = require('./keybindings');
// var clicks = require('./clickbindings');

request.open('GET', '/json-list', true);

request.onload = function() {
  'use strict';
  if (request.status >= 200 && request.status < 400) {
    var data = JSON.parse(request.responseText);
    var getMoment = moments(data);
    keys(getMoment);
    clicks(getMoment);

  } else {
    console.log('Something went wrong!');
  }
};

request.onerror = function() {
  'use strict';
  document.querySelector('main').innerHTML = 'connection error';
};

request.send();