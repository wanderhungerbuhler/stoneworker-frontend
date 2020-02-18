import axios from 'axios';

const api = axios.create({
  baseURL: 'http://stoneworkerapi.herokuapp.com/api',
});

export default api;
