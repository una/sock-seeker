import ImageSwitcher from './imageSwitcher';

const LightBox = () => {
  // current image being magnified in the lightbox
  let openImage;

  // DOM element reference
  const closeBtn = document.querySelector('.controls__btn--close');
  const body = document.querySelector('body');

  // search results in spread out array for results
  const resultBlock = [... (document.querySelectorAll('.result__block'))];

  // check if there is an open image and apply appropriate classes
  // as well as track the currently open image
  const lightBoxAdder = (e, openImage) => {
    if (openImage && openImage.classList.contains('lightboxed')) {
      openImage.classList.remove('lightboxed');
      body.classList.remove('lightbox-open');
    } else {
      // save current open image result block
      openImage = e.target;

      openImage.classList.add('lightboxed');
      body.classList.add('lightbox-open');
      ImageSwitcher(openImage);
    };
  };

  // add event listeners to results
  const initiateImageClicker = () => resultBlock.forEach(result => {
    result.addEventListener('click', (e) => {
      lightBoxAdder(e, openImage);
    });
  });

  // allow the close button to remove lightbox
  const initiateCloseBtn = () => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // remove all lightbox views
      resultBlock.forEach(result => {
        result.classList.remove('lightboxed');
        body.classList.remove('lightbox-open');
      });
    });
  }

  initiateImageClicker();
  initiateCloseBtn();
};

export default LightBox;