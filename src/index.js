import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';

import PixabayApiService from './js/api-service';

const pixabayApiService = new PixabayApiService();

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  refs.loadMoreBtn.disabled = true;

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (pixabayApiService.query) {
    pixabayApiService.resetPage();
    pixabayApiService.fetchArticles().then(data => {
      if (Number(data.hits) === 0) {
        return Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        clearGalleryContainer();
        getCard(data);
        refs.loadMoreBtn.classList.remove('is-hidden');
        refs.loadMoreBtn.disabled = false;
      }
    });
  }
}

function onLoadMore() {
  refs.loadMoreBtn.disabled = true;

  pixabayApiService.fetchArticles().then(data => {
    getCard(data);
    refs.loadMoreBtn.disabled = false;
  });
}

function getCard(data) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', markUp(data));
}

function markUp(data) {
  return data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="gallery__photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy class="gallery__image" />
  <div class="gallery__info">
    <p class="gallery__info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="gallery__info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="gallery__info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="gallery__info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
