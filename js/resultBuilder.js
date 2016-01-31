const ResultBuilder = (results) => {

  console.log('going to build results here');

  results.forEach( (result, i) => {
    console.log(result);
    const resultList = document.querySelector('.result__list');

    const domTemplate =
    `<li class="result__block">
      <figure class="result__fig">
        <img class="result__image" src="${result.image}" alt="${result.title}">
        <figcaption class="result__caption">
          ${result.title}
        </figcaption>
      </figure>
    </li>`;

    resultList.innerHTML += domTemplate;

  });
};

export default ResultBuilder;