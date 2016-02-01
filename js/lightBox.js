// import ImageSwitcher from './imageSwitcher';

const LightBox = () => {
  let openImage;

  // page elements
  const closeBtn = document.querySelector('.controls__btn--close');
  const prevBtn = document.querySelector('.controls__btn--prev');
  const nextBtn = document.querySelector('.controls__btn--next');
  const body = document.querySelector('body');

  // search results in spread out array
  const resultBlock = [... (document.querySelectorAll('.result__block'))];

  // check if there is an openImage and if it has class lightboxed
  // before removing the class, if it doesn't have the class
  // yet, add one to create the lightbox view and set the openImage
  const lightBoxAdder = (e, openImage) => {

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
  };

  const removeLightBox = () => {
    result.classList.remove('lightboxed');
    body.classList.remove('lightbox-open');
  }

  const imageBlockClicker = () => resultBlock.forEach(result => {
    result.addEventListener('click', (e) => {
      lightBoxAdder(e, openImage);
    });
  });

  const closeBtnFunction = () => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // remove all lightbox view
      resultBlock.forEach(result => {
        result.classList.remove('lightboxed');
        body.classList.remove('lightbox-open');
      });
    });
  }

  const ImageSwitcher = (openImage) => {

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (openImage.nextSibling) {
        openImage.classList.remove('lightboxed');
        openImage = openImage.nextSibling;
        openImage.classList.add('lightboxed');
      }

      console.log(openImage);
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (openImage.previousSibling) {
        openImage.classList.remove('lightboxed');
        openImage = openImage.previousSibling;
        openImage.classList.add('lightboxed');
      }

      console.log(openImage);
    });
  };

  imageBlockClicker();
  closeBtnFunction();
};

export default LightBox;
