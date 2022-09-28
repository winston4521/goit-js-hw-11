import axios from 'axios';
const axios = require('axios');

export default class NewApiService {
  constructor() {
    this.search = '';
    this.page = 1;
    this.per_page = 40;
  }

  async onImgGet() {
    
    const URL = 'https://pixabay.com/api/';
    const KEY = '29453019-5a69b6c7b2f01a070c80deb0c';

    const response = await axios.get(`${URL}`, {
      params: {
        key: KEY,
        q: this.search,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.per_page,
        page: this.page,
      },
    });

    this.nextPage();

    return response.data;
  }
  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get onGet() {
    return this.search;
  }
  set onGet(neQuery) {
    this.search = neQuery;
  }
}
