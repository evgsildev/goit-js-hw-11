const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30074731-0b702233972bac9ac2c913ff6';
const DEFAULT_OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${DEFAULT_OPTIONS}&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
