<template>
  <div
    class="z-50 flex justify-center min-h-screen overflow-hidden bg-white"
    v-if="loadingStore.$state.loading"
  >
    <span class="loading loading-infinity w-[200px] text-warning"></span>
  </div>
  <nav-bar v-show="!loadingStore.$state.loading" class="" />
  <router-view v-show="!loadingStore.$state.loading" />
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { useProductStore } from "./stores/products";

const loadingStore = useLoadingStore();
const productStore = useProductStore();
onMounted(async () => {
  await productStore.fetchProducts();
  await productStore.fetchCategories();
});
</script>

<style scoped></style>
