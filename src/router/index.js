import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/home.vue";
import test3DVue from "@/views/test3D.vue";

const routes = [
  {
    path: "/create-your-own-luster/",
    // path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test3D",
    name: "Test3D",
    component: test3DVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: "/www.shahanluster.com", // Set your desired domain or base URL
  routes,
});

export default router;
