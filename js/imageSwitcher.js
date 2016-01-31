const ImageSwitcher = (openImage) => {

  const prevBtn = document.querySelector('.controls__btn--prev');
  const nextBtn = document.querySelector('.controls__btn--next');

  console.log(openImage);

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openImage = openImage.nextSibling;
    console.log(openImage);

  });



};

export default ImageSwitcher;
