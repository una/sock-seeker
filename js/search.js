import CallResults from './apiCall';

const Search = () => {
  const submitBtn = document.querySelector('.search__submit');
  const searchBox = document.querySelector('.search__input');

  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let newQuery = searchBox.value || 'cute+unicorn';
    CallResults(newQuery);
  });

};

export default Search;
