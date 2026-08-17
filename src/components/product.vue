<template>
  <li
    v-if="!props.product?.isStock || props.product?.isStock === 'instock'"
    @click="onModalProduct"
    class="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-zinc-100 transition-colors group border border-transparent hover:border-zinc-200"
  >
    <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-50 flex-shrink-0 border border-zinc-200 flex items-center justify-center">
      <img
        v-if="props.product.imgURL"
        :src="props.product.imgURL"
        :alt="props.product.title"
        class="w-full h-full object-contain p-1"
      />
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-xs font-bold text-zinc-900 truncate group-hover:text-amber-600 transition-colors">{{ props.product.title }}</p>
      <p class="text-[11px] text-zinc-500 font-mono mt-0.5">{{ props.product.dimension }}</p>
    </div>
    <div class="text-right flex-shrink-0">
      <p class="text-xs font-black text-amber-600">${{ props.product.price }}</p>
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-zinc-400 group-hover:text-amber-500 transition-colors ml-auto mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/products";
import type { Product } from "@/stores/products";

const props = defineProps<{ product: Product }>();
const store = useProductStore();

const onModalProduct = () => store.setProductModal(true, props.product);
</script>

<style scoped></style>
