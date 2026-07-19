<template>
  <li
    v-if="props.product?.isStock === 'instock'"
    @click="onModalProduct"
    class="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors group border border-transparent hover:border-zinc-200"
  >
    <div class="w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 flex-shrink-0">
      <v-lazy-image
        :src="props.product.imgURL"
        class="w-full h-full object-cover"
      />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-zinc-800 truncate">{{ props.product.title }}</p>
      <p class="text-xs text-zinc-500 mt-0.5">{{ props.product.dimension }}</p>
    </div>
    <div class="text-right flex-shrink-0">
      <p class="text-sm font-bold text-amber-600">${{ props.product.price }}</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-zinc-400 group-hover:text-amber-500 transition-colors ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/products";
import VLazyImage from "v-lazy-image";
import type { Product } from "@/stores/products";

const props = defineProps<{ product: Product }>();
const store = useProductStore();

const onModalProduct = () => store.setProductModal(true, props.product);
</script>

<style scoped>
.v-lazy-image { filter: blur(8px); transition: filter 0.5s; }
.v-lazy-image-loaded { filter: blur(0); }
</style>
