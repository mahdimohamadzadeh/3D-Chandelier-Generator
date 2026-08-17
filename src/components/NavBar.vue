<template>
  <nav class="fixed top-0 left-0 right-0 z-50 h-16 bg-white/85 backdrop-blur-md border-b border-zinc-200/90 text-zinc-900 flex items-center justify-between px-4 md:px-8 shadow-xs">
    <!-- Left Logo & Menu Toggle -->
    <div class="flex items-center gap-4">
      <button @click="onMenu" class="p-2 rounded-xl text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition-colors" title="Toggle 3D Configurator">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <router-link to="/" class="flex items-center gap-2.5 group">
        <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
          <span class="text-white font-black text-sm">✦</span>
        </div>
        <span class="font-extrabold text-lg tracking-tight text-zinc-900">
          Luster<span class="text-amber-500">3D</span>
        </span>
      </router-link>
    </div>

    <!-- Center Nav Links -->
    <ul class="hidden md:flex items-center gap-1.5">
      <li v-for="link in navLinks" :key="link.path">
        <router-link
          :to="link.path"
          class="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-amber-600 hover:bg-amber-50/60 rounded-xl transition-all"
          active-class="text-amber-600 font-semibold bg-amber-50 border border-amber-200/60 shadow-xs"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>

    <!-- Right Actions (Cart Button) -->
    <div class="flex items-center gap-3">
      <router-link
        to="/cart"
        class="relative flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-zinc-800 hover:text-amber-600 bg-white hover:bg-amber-50/50 border border-zinc-200 rounded-xl transition-all shadow-xs"
        active-class="border-amber-400 bg-amber-50 text-amber-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span class="hidden sm:inline">Cart</span>
        <span
          v-if="cartStore.totalItemsCount > 0"
          class="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-white bg-amber-500 rounded-full shadow-xs animate-pulse"
        >
          {{ cartStore.totalItemsCount }}
        </span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { useCartStore } from "@/stores/cart";

const loadingStore = useLoadingStore();
const cartStore = useCartStore();

const navLinks = [
  { label: '3D Studio', path: '/' },
  { label: 'Atelier Catalog', path: '/shop' },
  { label: 'Journal', path: '/blog' },
];

const onMenu = () => {
  loadingStore.isMenu = !loadingStore.isMenu;
};
</script>
