<template>
  <!-- Full Screen Initial App Loader -->
  <div
    class="z-50 flex flex-col justify-center items-center min-h-screen bg-zinc-950 text-white fixed inset-0"
    v-if="loadingStore.loading"
  >
    <div class="relative flex items-center justify-center w-24 h-24 mb-6">
      <span class="absolute inset-0 w-full h-full border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></span>
      <span class="text-amber-500 font-bold text-xs tracking-widest uppercase">Luster</span>
    </div>
    <p class="text-sm text-zinc-400 font-medium tracking-wide animate-pulse">Initializing 3D Studio...</p>
  </div>

  <!-- GLB 3D Model Downloading Full-Screen Overlay with Percentage -->
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-250 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loadingStore.isModelLoading"
      class="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-xl px-4"
    >
      <div class="relative flex flex-col items-center justify-center p-8 sm:p-10 bg-zinc-900/90 border border-zinc-800 rounded-3xl shadow-[0_0_50px_rgba(245,158,11,0.15)] max-w-sm w-full text-center">
        <!-- SVG Radial Progress Ring -->
        <div class="relative flex items-center justify-center w-32 h-32 mb-6">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background track circle -->
            <circle
              cx="50"
              cy="50"
              r="42"
              class="stroke-zinc-800"
              stroke-width="8"
              fill="transparent"
            />
            <!-- Animated progress circle -->
            <circle
              cx="50"
              cy="50"
              r="42"
              class="stroke-amber-500 transition-all duration-300 ease-out"
              stroke-width="8"
              stroke-linecap="round"
              fill="transparent"
              :stroke-dasharray="263.89"
              :stroke-dashoffset="263.89 - (263.89 * (loadingStore.xhrLoading || 0)) / 100"
            />
          </svg>

          <!-- Center Percentage Text -->
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-3xl font-extrabold text-white tracking-tight">
              {{ loadingStore.xhrLoading ?? 0 }}<span class="text-amber-500 text-xl font-bold">%</span>
            </span>
            <span class="text-[10px] text-zinc-400 font-semibold uppercase tracking-widest mt-0.5">Loaded</span>
          </div>
        </div>

        <!-- Linear Progress Bar -->
        <div class="w-full bg-zinc-800 rounded-full h-2 mb-4 overflow-hidden p-0.5">
          <div
            class="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            :style="{ width: `${loadingStore.xhrLoading ?? 0}%` }"
          />
        </div>

        <h2 class="text-lg font-bold text-white tracking-wide">Downloading 3D Asset</h2>
        <p class="text-xs text-zinc-400 mt-1 leading-relaxed">
          Decrypting geometry mesh & textures...
        </p>

        <!-- Dynamic Status Tag -->
        <div class="mt-4 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span class="text-[11px] font-semibold text-amber-400">
            {{ (loadingStore.xhrLoading || 0) < 100 ? 'Streaming GLB data...' : 'Processing model...' }}
          </span>
        </div>
      </div>
    </div>
  </transition>

  <nav-bar v-show="!loadingStore.loading" />
  <router-view v-show="!loadingStore.loading" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useProductStore } from "@/stores/products";
import NavBar from "@/components/NavBar.vue";

const loadingStore = useLoadingStore();
const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchProducts();
  await productStore.fetchCategories();
});
</script>

<style scoped></style>
