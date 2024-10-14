import { images } from './imagesArray.js';

const createGalleryItem = item => {
  const liEl = document.createElement('li');
  liEl.classList.add('gallery-item');

  const linkEl = document.createElement('a');
  linkEl.classList.add('gallery-link');
  linkEl.href = item.original;

  const imageEl = document.createElement('img');
  imageEl.classList.add('gallery-image');
  imageEl.src = item.preview;
  imageEl.setAttribute('data-source', item.original);
  imageEl.alt = item.description;

  linkEl.append(imageEl);
  liEl.append(linkEl);

  return liEl;
};

const galleryItems = images.map(createGalleryItem);
const galleryEl = document.querySelector('.gallery');

galleryEl.append(...galleryItems);

galleryEl.addEventListener('click', galleryOnClick);

function galleryOnClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  createModal(event.target.getAttribute('data-source'));
}

function createModal(link) {
  const instance = basicLightbox.create(
    `<div class="modal">
    <img class="modal-img" src=${link}>
    <p>Tap anywhere to close</p>
    </div>`
  );
  instance.show();

  const modalEl = document.querySelector('.modal');
  modalEl.addEventListener('click', modalElOnClick);

  function modalElOnClick() {
    instance.close();
  }
}
