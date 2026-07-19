<template>
  <nav class="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8">
    <div class="flex items-center gap-3">
      <button @click="onMenu" class="p-2 rounded-lg hover:bg-gray-100 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <img src="/logo.png" alt="Luster 3D" class="h-8 object-contain" />
    </div>

    <ul class="hidden md:flex items-center gap-1">
      <li v-for="item in ['Home','Shop','Contact','Blog']" :key="item">
        <a href="#" class="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">{{ item }}</a>
      </li>
    </ul>

    <div class="w-24 hidden md:block" />
  </nav>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
const loadingStore = useLoadingStore();
const onMenu = () => { loadingStore.isMenu = !loadingStore.isMenu; };
</script>
