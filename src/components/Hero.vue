<template>
  <div class="min-h-screen pt-16 bg-slate-50 text-zinc-900 selection:bg-amber-500 selection:text-white">

    <!-- slide-in side panel -->
    <transition name="panel">
      <aside v-if="!isHeroDesktop && !isHeroMobile" v-show="loadingStore.isMenu"
        class="fixed bottom-0 left-0 z-40 flex flex-col overflow-hidden bg-white border-r border-zinc-200 shadow-2xl top-16 w-80">
        <!-- panel header -->
        <div class="flex items-center justify-between px-4 py-4 border-b border-zinc-200 bg-zinc-50">
          <h2 class="text-base font-bold text-zinc-900 flex items-center gap-2">
            <span class="text-amber-500">✦</span> 3D Atelier Configurator
          </h2>
          <button @click="loadingStore.isMenu = false" class="flex items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-zinc-200 text-zinc-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- step hint -->
        <div class="px-4 py-3 border-b bg-amber-50 border-amber-200/80">
          <p class="text-xs font-semibold text-amber-800">Start with <span class="font-extrabold text-amber-900">Collar</span>, then select arms & bulbs in order.</p>
        </div>

        <!-- categories -->
        <div class="flex-1 overflow-y-auto">
          <keep-alive>
            <accordion-categories />
          </keep-alive>
        </div>
      </aside>
    </transition>

    <!-- backdrop -->
    <transition name="fade">
      <div
        v-if="loadingStore.isMenu"
        class="fixed inset-0 top-16 z-30 bg-black/40 backdrop-blur-xs"
        @click="loadingStore.isMenu = false"
      />
    </transition>

    <!-- main content -->
    <main class="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">

      <!-- hero splash (before start) -->
      <div v-if="isHeroDesktop || isHeroMobile" class="max-w-2xl text-center py-12">
        <span class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-100 text-amber-800 border border-amber-200 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          <span>✦</span> Next-Gen 3D Chandelier Studio
        </span>

        <h1 class="text-4xl sm:text-6xl font-extrabold leading-tight text-zinc-900 tracking-tight">
          Design Your <span class="text-amber-500">Custom Chandelier</span>
        </h1>
        <p class="mt-4 text-base sm:text-lg text-zinc-600 leading-relaxed">
          Build a unique 3D chandelier step by step — select components, inspect geometry, and watch your vision come to life in real time.
        </p>

        <ul class="grid max-w-md grid-cols-2 gap-4 mx-auto mt-8 text-xs sm:text-sm text-left">
          <li v-for="f in features" :key="f.label" class="flex items-start gap-2.5 p-3 rounded-2xl bg-white border border-zinc-200/80 shadow-xs">
            <span class="text-amber-500 font-bold mt-0.5">✦</span>
            <span><strong class="text-zinc-900 block">{{ f.label }}</strong><span class="text-zinc-500 text-xs">{{ f.desc }}</span></span>
          </li>
        </ul>

        <button @click="onStart" class="px-8 py-4 mt-10 text-sm font-extrabold text-white transition-all shadow-xl bg-amber-500 hover:bg-amber-400 rounded-2xl hover:shadow-amber-500/25 active:scale-95">
          Start 3D Configurator →
        </button>
      </div>

      <!-- 3D canvas + order bar -->
      <div v-else class="flex flex-col items-center w-full max-w-4xl gap-6 py-6">
        <div ref="container" class="flex items-center justify-center w-full overflow-hidden shadow-2xl rounded-3xl bg-zinc-100 border border-zinc-200" style="height: 62vh;" />

        <!-- order bar -->
        <div v-if="store.$state.models.length > 0" class="flex items-center justify-between w-full px-6 py-4 bg-white border border-zinc-200/80 shadow-xl rounded-2xl">
          <div>
            <p class="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Total Configured Price</p>
            <p class="text-2xl font-black text-amber-600">${{ totalPrice }}</p>
          </div>
          <button onclick="my_modal_2.showModal()" class="px-6 py-3 font-extrabold text-white transition-all shadow-md bg-amber-500 hover:bg-amber-400 rounded-xl text-xs">
            View Assembly Breakdown
          </button>
        </div>
      </div>
    </main>

    <!-- order modal -->
    <dialog id="my_modal_2" class="modal">
      <order :totalOrder="totalOrder" @on-buy="onBuy" />
      <form method="dialog" class="modal-backdrop"><button>close</button></form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { useModelStore } from "@/stores/models3D";
import { useProductStore } from "@/stores/products";
import { useRouter } from "vue-router";
import { provide, ref, computed } from "vue";
import order from "@/components/order.vue";
import accordionCategories from "@/components/accordionCategories.vue";

const router = useRouter();
const modelStore = useModelStore();
const store = useProductStore();
const loadingStore = useLoadingStore();
const container = ref();
const totalPrice = computed(() => modelStore.$state.totalPrice);
const totalOrder = computed(() => modelStore.$state.totalOrder);

const isHeroDesktop = ref(true);
const isHeroMobile = ref(true);

const features = [
  { label: "Bespoke Geometry", desc: "Crafted to match your ceiling space" },
  { label: "Real-Time 3D", desc: "Interactive Three.js WebGL engine" },
  { label: "Modular Assembly", desc: "Unlimited tier & arm variations" },
  { label: "Direct Atelier Order", desc: "Handcrafted directly to specification" },
];

const onStart = () => {
  isHeroDesktop.value = false;
  isHeroMobile.value = false;
  loadingStore.isMenu = true;
  window.scrollTo(0, 0);
};

const onBuy = () => router.push("/cart");

provide("container", container);
</script>

<style scoped>
.panel-enter-active, .panel-leave-active { transition: transform 0.3s ease; }
.panel-enter-from, .panel-leave-to { transform: translateX(-100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
