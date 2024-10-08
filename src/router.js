import { createWebHistory, createRouter } from "vue-router";
import Intro from "./pages/Intro.vue"
import Main from "./pages/Main.vue"
import Admin from "./pages/Admin.vue"
import Details from "./pages/Details.vue"
const routes = [
  {
    path: "/",
    component: Intro,
  },
  {
    path: "/main",
    component: Main,
  },
  {
    path:"/admin",
    component: Admin
  },
  {
    path: "/post/:id",
    component: Details
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 