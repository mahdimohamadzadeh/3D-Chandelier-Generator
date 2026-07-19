import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home.vue";
import Test3D from "@/views/test3D.vue";

const routes: RouteRecordRaw[] = [
  { path: "/",       name: "Home",   component: Home   },
  { path: "/test3D", name: "Test3D", component: Test3D },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
