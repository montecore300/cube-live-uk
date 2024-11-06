function openMediaModal(mediaWrapper) {
  const modal = document.getElementById('mediaModal');
  const modalContent = document.getElementById('modalMediaContent');

  modalContent.innerHTML = '';
  const clonedContent = mediaWrapper.cloneNode(true);

  // Add the zoomable-list class to the media list inside the cloned content
  const mediaList = clonedContent.querySelector('.product__media-list');
  if (mediaList) {
    mediaList.classList.add('zoomable-list');
  }

  modalContent.appendChild(clonedContent);
  modal.classList.remove('hidden');

  // Close the modal when clicking the close button
  document.querySelector('.product-media-modal__toggle').onclick = () => {
    modal.classList.add('hidden');
  };

  // Close the modal when clicking outside the content
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.classList.add('hidden');
    }
  };




  const activeMediaSelector = '.zoomable-list .product__media-item.grid__item.slider__slide.is-active .image-magnify-hover';

  // Zoom in button click handler
  document.querySelector('.product-media-modal__zoom-in').onclick = () => {
    const activeMedia = document.querySelector(activeMediaSelector);
    if (activeMedia) {
      let currentScale = getComputedStyle(activeMedia).transform.match(/matrix\(([^)]+)\)/);
      currentScale = currentScale ? parseFloat(currentScale[1].split(',')[0]) : 1; // Extract current scale
      let newScale = currentScale + 0.1;
      activeMedia.style.transform = `scale(${newScale})`; // Increase scale by 0.1 with each click
    }
  };
  
  // Zoom out button click handler
  document.querySelector('.product-media-modal__zoom-out').onclick = () => {
    const activeMedia = document.querySelector(activeMediaSelector);
    if (activeMedia) {
      let currentScale = getComputedStyle(activeMedia).transform.match(/matrix\(([^)]+)\)/);
      currentScale = currentScale ? parseFloat(currentScale[1].split(',')[0]) : 1; // Extract current scale
      let newScale = Math.max(currentScale - 0.1, 1); // Ensure scale doesn't go below 1 (original size)
      activeMedia.style.transform = `scale(${newScale})`; // Decrease scale by 0.1 with each click
    }
  };
  
  
  




}

function enableMediaModal() {
  const magnifyImages = document.querySelectorAll('.image-magnify-hover');

  magnifyImages.forEach((image) => {
    image.onclick = () => {
      const mediaWrapper = image.closest('.product__media-wrapper');
      if (mediaWrapper) {
        openMediaModal(mediaWrapper);
      }
    };
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const thumbnails = document.querySelectorAll('.thumbnail-list__item button');
  const mainImages = document.querySelectorAll('.product__media-item');

  // Handle thumbnail clicks to change active image
  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function () {
      const targetMediaId = this.closest('.thumbnail-list__item').getAttribute('data-target');

      mainImages.forEach(image => {
        image.classList.remove('is-active');
        if (image.getAttribute('data-media-id') === targetMediaId) {
          image.classList.add('is-active');
        }
      });
    });
  });

  // Reset zoom on modal open
  document.querySelector('.product__modal-opener').addEventListener('click', function () {
    const activeImage = document.querySelector('.product__media-item.is-active');
    if (activeImage) {
      activeImage.style.transform = 'scale(1)'; 
    }
  });
});

enableMediaModal();
