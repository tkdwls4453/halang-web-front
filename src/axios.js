import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://43.203.210.230',
  timeout: 1000000,
  headers:{ 'Content-Type': 'application/json'}
})

export default instance;