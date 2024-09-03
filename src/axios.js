import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://13.209.146.246',
  timeout: 1000000,
  headers:{ 'Content-Type': 'application/json'}
})

export default instance;