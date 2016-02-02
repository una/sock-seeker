const ResultBuilder = (results) => {
  const resultList = document.querySelector('.result__list');

  // Remove the waiting message or current results
  resultList.innerHTML = '';

  results.forEach((result, i) => {

    const domTemplate =
    `<li class="result__block">
      <figure class="result__fig">
        <img class="result__image" src="${result.image}" alt="${result.title}">
        <figcaption class="result__caption">
          ${result.title}
        </figcaption>
      </figure>
    </li>`;

    // Fill the result list!
    resultList.innerHTML += domTemplate;
  });
};

export default ResultBuilder;