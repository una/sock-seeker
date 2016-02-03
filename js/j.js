/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _apiCall = __webpack_require__(1);

	var _apiCall2 = _interopRequireDefault(_apiCall);

	var _search = __webpack_require__(5);

	var _search2 = _interopRequireDefault(_search);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// initial request query is for unicorn socks
	(0, _apiCall2.default)('cute+unicorn');
	(0, _search2.default)();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _resultBuilder = __webpack_require__(2);

	var _resultBuilder2 = _interopRequireDefault(_resultBuilder);

	var _lightBox = __webpack_require__(3);

	var _lightBox2 = _interopRequireDefault(_lightBox);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var apiCall = function apiCall(query) {
	  var request = new XMLHttpRequest();
	  var results = [];

	  // I know in production, these values should be hidden
	  // and pulled in via the server reading the env
	  // but I wanted to host a static site on GH pages :)
	  var key = 'AIzaSyCaZUBImP47vtg5mbBOHJI9LB66FQwzwF4';
	  var search_id = '003445731598848083469:wurvxzovwmu';

	  // API request on ready state change for search and pulling in data
	  request.onreadystatechange = function () {

	    if (request.status >= 200 && request.readyState == 4) {
	      var data = JSON.parse(request.responseText).items;

	      // array with result objects (these define the keys)
	      for (var i = 0; i < data.length; i++) {
	        results.push({
	          title: data[i].title,
	          image: data[i].link,
	          link: data[i].image.contextLink
	        });
	      }

	      // Passing results into resultBuilder to build the page
	      (0, _resultBuilder2.default)(results);
	      (0, _lightBox2.default)();
	    }
	  };

	  request.open('GET', 'https://www.googleapis.com/customsearch/v1?key=' + key + '&cx=' + search_id + '&searchType=image&q=' + query + '+socks', true);
	  request.send();
	};

	exports.default = apiCall;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ResultBuilder = function ResultBuilder(results) {
	  var resultList = document.querySelector('.result__list');

	  // Remove the waiting message or current results
	  resultList.innerHTML = '';

	  results.forEach(function (result, i) {

	    var domTemplate = '<li class="result__block">\n      <figure class="result__fig">\n        <img class="result__image" src="' + result.image + '" alt="' + result.title + '">\n        <figcaption class="result__caption">\n          ' + result.title + '\n        </figcaption>\n      </figure>\n    </li>';

	    // Fill the result list!
	    resultList.innerHTML += domTemplate;
	  });
	};

	exports.default = ResultBuilder;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _imageSwitcher = __webpack_require__(4);

	var _imageSwitcher2 = _interopRequireDefault(_imageSwitcher);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var LightBox = function LightBox() {
	  // current image being magnified in the lightbox
	  var openImage = undefined;

	  // DOM element reference
	  var closeBtn = document.querySelector('.controls__btn--close');
	  var body = document.querySelector('body');

	  // search results in spread out array for results
	  var resultBlock = [].concat(_toConsumableArray(document.querySelectorAll('.result__block')));

	  // check if there is an open image and apply appropriate classes
	  // as well as track the currently open image
	  var lightBoxAdder = function lightBoxAdder(e, openImage) {
	    if (openImage && openImage.classList.contains('lightboxed')) {
	      openImage.classList.remove('lightboxed');
	      body.classList.remove('lightbox-open');
	    } else {
	      // save current open image result block
	      openImage = e.target;

	      openImage.classList.add('lightboxed');
	      body.classList.add('lightbox-open');
	      (0, _imageSwitcher2.default)(openImage);
	    };
	  };

	  // add event listeners to results
	  var initiateImageClicker = function initiateImageClicker() {
	    return resultBlock.forEach(function (result) {
	      result.addEventListener('click', function (e) {
	        lightBoxAdder(e, openImage);
	      });
	    });
	  };

	  // allow the close button to remove lightbox
	  var initiateCloseBtn = function initiateCloseBtn() {
	    closeBtn.addEventListener('click', function (e) {
	      e.preventDefault();

	      // remove all lightbox views
	      resultBlock.forEach(function (result) {
	        result.classList.remove('lightboxed');
	        body.classList.remove('lightbox-open');
	      });
	    });
	  };

	  initiateImageClicker();
	  initiateCloseBtn();
	};

	exports.default = LightBox;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ImageSwitcher = function ImageSwitcher(openImage) {
	  var prevBtn = document.querySelector('.controls__btn--prev');
	  var nextBtn = document.querySelector('.controls__btn--next');

	  nextBtn.addEventListener('click', function (e) {
	    e.preventDefault();

	    if (openImage.nextSibling) {
	      openImage.classList.remove('lightboxed');
	      openImage = openImage.nextSibling;
	      openImage.classList.add('lightboxed');
	    }
	  });

	  prevBtn.addEventListener('click', function (e) {
	    e.preventDefault();

	    if (openImage.previousSibling) {
	      openImage.classList.remove('lightboxed');
	      openImage = openImage.previousSibling;
	      openImage.classList.add('lightboxed');
	    }
	  });
	};

	exports.default = ImageSwitcher;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _apiCall = __webpack_require__(1);

	var _apiCall2 = _interopRequireDefault(_apiCall);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Search = function Search() {
	  var submitBtn = document.querySelector('.search__submit');
	  var searchBox = document.querySelector('.search__input');

	  submitBtn.addEventListener('click', function (e) {
	    e.preventDefault();
	    var newQuery = searchBox.value || 'cute+unicorn';
	    (0, _apiCall2.default)(newQuery);
	  });
	};

	exports.default = Search;

/***/ }
/******/ ]);