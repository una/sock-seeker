const LightBox = () => {
  console.log('lightbox');

  // all of the results from node list spread into array
  const resultBlock = [... (document.querySelectorAll('.result__block'))];

  const addLightbox = (results) => {
    results.forEach(result => {
      result.addEventListener('click', function() {
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
