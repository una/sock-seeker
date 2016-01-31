import ImageSwitcher from './imageSwitcher';

const LightBox = () => {

  // all of the results from node list spread into array
  const resultBlock = [... (document.querySelectorAll('.result__block'))];
  const body = document.querySelector('body');
  let openImage;

  resultBlock.forEach(result => {
    result.addEventListener('click', (e) => {
      if (openImage && openImage.classList.contains('lightboxed')) {
        openImage.classList.remove('lightboxed');
        body.classList.remove('lightbox-open');
      } else {
        // save current open image block
        openImage = e.target;

        openImage.classList.add('lightboxed');
        body.classList.add('lightbox-open');

        ImageSwitcher(openImage);
      };
    });
  });
};

export default LightBox;
