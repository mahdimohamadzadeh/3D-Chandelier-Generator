import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Home from "@/views/home.vue";
import Shop from "@/views/Shop.vue";
import Blog from "@/views/Blog.vue";
import Cart from "@/views/Cart.vue";
import Test3D from "@/views/test3D.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Home", component: Home },
  { path: "/shop", name: "Shop", component: Shop },
  { path: "/blog", name: "Blog", component: Blog },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/test3D", name: "Test3D", component: Test3D },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
