// using list from API call
module.exports = function(data) {

  var searchResults, count, i;
  searchResults = data;
  count = searchResults.count;

  console.log(data);

  var nextResult = function() {
    i++;
    return updateResults(i);
  };

  var prevResult = function() {
    i--;
    return updateResults(i);
  };

  function updateResults(i) {
    image = searchResults.items[i].image;
    title = searchResults.items[i].title;
    document.querySelector('.result--title').innerHTML = title;
    document.querySelector('.result--image').setAttribute('src', image);
  }

  return {
    prevResult: prevResult,
    randomResult: randomResult,
    nextResult: nextResult
  };
};