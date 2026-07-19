<template>
  <div class="min-h-screen pt-16 bg-gray-50">

    <!-- slide-in side panel -->
    <transition name="panel">
      <aside
        v-show="loadingStore.isMenu"
        class="fixed bottom-0 left-0 z-40 flex flex-col overflow-hidden bg-white shadow-2xl top-16 w-80"
      >
        <!-- panel header -->
        <div class="flex items-center justify-between px-4 py-4 border-b border-zinc-100 bg-zinc-50">
          <h2 class="text-base font-bold text-zinc-800">Configure Chandelier</h2>
          <button @click="loadingStore.isMenu = false" class="flex items-center justify-center w-8 h-8 transition-colors rounded-full hover:bg-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- step hint -->
        <div class="px-4 py-3 border-b bg-amber-50 border-amber-100">
          <p class="text-xs font-medium text-amber-700">Start with <span class="font-bold">Collar</span>, then work through each category in order.</p>
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
        class="fixed inset-0 top-16 z-30 bg-black/40 backdrop-blur-[2px]"
        @click="loadingStore.isMenu = false"
      />
    </transition>

    <!-- main content -->
    <main class="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">

      <!-- hero splash (before start) -->
      <div v-if="isHeroDesktop || isHeroMobile" class="max-w-2xl text-center">
        <h1 class="text-4xl font-extrabold leading-tight md:text-5xl text-zinc-900">
          Design Your <span class="text-amber-500">Custom Chandelier</span>
        </h1>
        <p class="mt-4 text-lg text-zinc-500">
          Build a unique 3D chandelier step by step — choose each part and see it come to life in real time.
        </p>
        <ul class="grid max-w-md grid-cols-2 gap-3 mx-auto mt-8 text-sm text-left text-zinc-600">
          <li v-for="f in features" :key="f.label" class="flex items-start gap-2">
            <span class="text-amber-500 mt-0.5">✦</span>
            <span><strong class="text-zinc-800">{{ f.label }}</strong> — {{ f.desc }}</span>
          </li>
        </ul>
        <button @click="onStart" class="px-8 py-4 mt-10 text-base font-bold text-white transition-all shadow-lg bg-amber-500 hover:bg-amber-400 rounded-2xl hover:shadow-amber-500/30">
          Start Designing
        </button>
      </div>

      <!-- 3D canvas + order bar -->
      <div v-else class="flex flex-col items-center w-full max-w-4xl gap-6">
        <div ref="container" class="flex items-center justify-center w-full overflow-hidden shadow-2xl rounded-2xl bg-zinc-100" style="height: 60vh;" />

        <!-- order bar -->
        <div v-if="store.$state.models.length > 0" class="flex items-center justify-between w-full px-6 py-4 bg-white border shadow-lg rounded-2xl border-zinc-200">
          <div>
            <p class="text-xs tracking-widest uppercase text-zinc-500">Total Price</p>
            <p class="text-2xl font-extrabold text-amber-500">${{ totalPrice }}</p>
          </div>
          <button onclick="my_modal_2.showModal()" class="px-6 py-3 font-bold text-white transition-all shadow-md bg-amber-500 hover:bg-amber-400 rounded-xl">
            View Order
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
  { label: "Unique", desc: "No one else will have it" },
  { label: "Perfect Fit", desc: "Matches your decor" },
  { label: "Variety", desc: "Unlimited shapes & sizes" },
  { label: "Affordable", desc: "Tailored to your budget" },
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
