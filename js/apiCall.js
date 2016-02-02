import ResultBuilder from './resultBuilder';
import LightBox from './lightBox';

const apiCall = (query) => {
  const request = new XMLHttpRequest();
  let results = [];

  // I know in production, these values should be hidden
  // and pulled in via the server reading the env
  // but I wanted to host a static site on GH pages :)
  const key = 'AIzaSyCaZUBImP47vtg5mbBOHJI9LB66FQwzwF4';
  const search_id = '003445731598848083469:wurvxzovwmu';

  // API request on ready state change for search and pulling in data
  request.onreadystatechange = function() {

    if (request.status >= 200 && request.readyState == 4) {
      const data = JSON.parse(request.responseText).items;

      // array with result objects (these define the keys)
      for (let i = 0; i < data.length; i++) {
        results.push({
          title: data[i].title,
          image: data[i].link,
          link: data[i].image.contextLink
        });
      }

      // Passing results into resultBuilder to build the page
      ResultBuilder(results);
      LightBox();
    }
  };

  request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + search_id + '&searchType=image&q=' + query + '+socks', true);
  request.send();
}

export default apiCall;