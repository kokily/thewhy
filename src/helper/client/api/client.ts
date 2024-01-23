import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api'
      : 'https://thewhy.kr/api',
  withCredentials: true,
});

export default client;
