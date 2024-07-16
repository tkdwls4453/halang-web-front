import { createWebHistory, createRouter } from "vue-router";
import Intro from "./pages/Intro.vue"
import Main from "./pages/Main.vue"

const routes = [
  {
    path: "/",
    component: Intro,
  },
  {
    path: "/main",
    component: Main,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 