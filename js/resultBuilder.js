'strict mode';

// using list from API call
module.exports = function(results) {

  console.log('going to build results here');

  results.forEach( function(result, i) {
    console.log(result);
    let img = new Image();
    let div = document.querySelector('main');

    img.onload = function() {
      div.appendChild(img);
    };

    img.src = result.image;

  });

};