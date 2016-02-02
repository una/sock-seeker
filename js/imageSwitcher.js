const ImageSwitcher = (openImage) => {
  const prevBtn = document.querySelector('.controls__btn--prev');
  const nextBtn = document.querySelector('.controls__btn--next');

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (openImage.nextSibling) {
      openImage.classList.remove('lightboxed');
      openImage = openImage.nextSibling;
      openImage.classList.add('lightboxed');
    }
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (openImage.previousSibling) {
      openImage.classList.remove('lightboxed');
      openImage = openImage.previousSibling;
      openImage.classList.add('lightboxed');
    }
  });
};

export default ImageSwitcher;