import FetchApiPixabay from './js/fetchPhotos';
import { onRenderGallery } from './js/renderGallery';
import {
  btnHidden,
  btnSearchDisabled,
  btnActive,
  clearGallery,
  btnVisible,
  clearGallery,
} from './js/alerts';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
const newApiService = new FetchApiPixabay();
const from = document.querySelector('#search-form');
const loadMore = document.querySelector('.load-more');
let amount = 0;
from.addEventListener('submit', onSearch);
from.addEventListener('input', onBtnHandler);
loadMore.addEventListener('click', onLoadMore);
const simpleLightBox = new SimpleLightbox('.gallery a');
btnHidden();
btnSearchDisabled();

// =================On Search====================
function onSearch(e) {
  btnSearchDisabled();
  e.preventDefault();
  clearGallery();
  newApiService.onGet = e.currentTarget.elements.searchQuery.value.trim();

  newApiService.resetPage();
  apiRequest();
  e.target.reset();
}

// ===================ApiRequest================
async function apiRequest() {
  const promise = await newApiService.onImgGet();
  const $hits = await promise.hits;

  if ($hits.length === 0) {
    btnHidden();
    Notiflix.Notify.failure(
      `Sorry, there are no images matching your search ${newApiService.onGet}. Please try again.`
    );
    return;
  }

  onRenderGallery($hits);
  simpleLightBox.refresh();
  Notiflix.Notify.success(`Hooray! We found ${promise.totalHits} images.`);

  if ($hits.length < newApiService.per_page) {
    btnHidden();
  } else {
    btnVisible();
  }
}

// =================onLoadMore=======================
async function onLoadMore() {
  newApiService.page += 1;
  const loadNewPage = await newApiService.onImgGet();
  amount = Math.ceil(loadNewPage.totalHits / newApiService.per_page);

  if (newApiService.page >= amount) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
    btnHidden();
  }

  onRenderGallery(loadNewPage.hits);
  simpleLightBox.refresh();
  Notiflix.Notify.success(`Hooray! We found ${loadNewPage.totalHits} images.`);
}

// ==============BTN HANDLER==================
function onBtnHandler(e) {
  if (e.currentTarget.searchQuery.value.trim() === '') {
    btnSearchDisabled();
    return;
  }
  btnActive();
}
