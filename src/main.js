import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store.js'
import VueCookies from 'vue-cookies';


createApp(App).use(router).use(store).use(VueCookies).mount('#app')
