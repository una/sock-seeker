const LightBox = () => {
  console.log('lightbox');

  // all of the results from node list spread into array
  const resultBlock = [... (document.querySelectorAll('.result__block'))];

  const addLightbox = (results) => {

    // iterating results to add event listeners for lightbox
    results.forEach(result => {
      result.addEventListener('click', () => {
        removeLightbox(results);
        result.classList.add('lightboxed');
      });
    });
  };

  const removeLightbox = (results) => {
    results.forEach(result => {
      if (result.classList.contains('lightboxed')) {
        result.classList.remove('lightboxed');
      }
    });
  }

  addLightbox(resultBlock);
};

export default LightBox;
