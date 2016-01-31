import CallResults from './callResults';

const Search = () => {

  const submitBtn = document.querySelector('.search__submit');
  const searchBox = document.querySelector('.search__input');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newQuery = searchBox.value || 'cute+unicorn';

    console.log('search for: ' + newQuery + ' socks');
    CallResults(newQuery);
  });

};

export default Search;
