import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://thewhy.kr/api'
      : 'http://localhost:3000/api',
  withCredentials: true,
});

export default client;
