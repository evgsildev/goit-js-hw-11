import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30074731-0b702233972bac9ac2c913ff6';
const DEFAULT_OPTIONS =
  '&image_type=photo&orientation=horizontal&safesearch=true';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchArticles() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${DEFAULT_OPTIONS}&per_page=${this.perPage}&page=${this.page}`;

    const getQuery = await axios.get(url);
    const data = await getQuery.data;

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.page;
  }

  getPerPage() {
    return this.perPage;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
