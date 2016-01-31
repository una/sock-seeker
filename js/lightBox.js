const LightBox = () => {
  console.log('lightbox');

  // all of the results from node list spread into array
  const resultBlock = [... (document.querySelectorAll('.result__block'))];
  const body = document.querySelector('body');

  resultBlock.forEach(result => {
    result.addEventListener('click', () => {
      if (result.classList.contains('lightboxed')) {
        result.classList.remove('lightboxed');
        body.classList.remove('lightbox-open');
      } else {
        result.classList.add('lightboxed');
        body.classList.add('lightbox-open');
      };
    });
  });
};

export default LightBox;
