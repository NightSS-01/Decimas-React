import axios from 'axios';

const notasApi = axios.create({
  baseURL: 'https://vrcastilloss.pythonanywhere.com/api',
  headers: { 'Content-Type': 'application/json' },
});

export default notasApi;