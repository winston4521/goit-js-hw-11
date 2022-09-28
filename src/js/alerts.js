export { btnHidden, btnSearchDisabled, btnActive, btnVisible, clearGallery };

const loadMore = document.querySelector('.load-more');
const $btnSearch = document.querySelector('button[type="submit"]');
const $gallery = document.querySelector('.gallery');

function btnHidden() {
  loadMore.classList.add('is-hidden');
}
function btnVisible() {
  loadMore.classList.remove('is-hidden');
}

function btnSearchDisabled() {
  $btnSearch.setAttribute('disabled', true);
}
function btnActive() {
  $btnSearch.removeAttribute('disabled');
}

function clearGallery() {
  $gallery.innerHTML = '';
}
