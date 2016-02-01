import ImageSwitcher from './imageSwitcher';

const LightBox = () => {
  let openImage;
  // all of the results from node list spread into array
  const resultBlock = [... (document.querySelectorAll('.result__block'))];
  const closeBtn = document.querySelector('.controls__btn--close');
  const body = document.querySelector('body');

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

  const imageBlockClicker = () => resultBlock.forEach(result => {
    result.addEventListener('click', (e) => {
      lightBoxAdder(e, openImage);
    });
  });

  const closeBtnFunction = () => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // remove all lightboxes
      resultBlock.forEach(result => {
        result.classList.remove('lightboxed');
        body.classList.remove('lightbox-open');
      });
    });
  }

  imageBlockClicker();
  closeBtnFunction();
};

// NOTE: WHAT I SHOULD BE DOING IS CHECKING
// IF THE IMAGE CLICKED IS OPEN IMAGE
// THEN DO THE LIGHTBOX THING
// ADD THE CLASS TO OPEN IMAGE
// SO THAT THE PREV AND NEXT CAN DO THE SAME THING
// JUST RESETING OPEN IMAGE
// (so clicking wont add the class, just set the open Image)

export default LightBox;
