const ImageSwitcher = (currImage) => {

  const prevBtn = document.querySelector('.controls__btn--prev');
  const nextBtn = document.querySelector('.controls__btn--next');
  let openImage;

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let openImage = currImage.nextSibling;

    console.log(openImage);
  });



};

export default ImageSwitcher;
