// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store.js';
import VueCookies from 'vue-cookies';
import './assets/styles.css'; // 스타일 시트를 추가합니다.

createApp(App)
  .use(router)
  .use(store)
  .use(VueCookies)
  .mount('#app');
