import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://3.35.173.151',
  timeout: 1000000,
  headers:{ 'Content-Type': 'application/json'}
})

export default instance;