<template>
  <teleport to="body">
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- backdrop -->
      <div class="absolute inset-0 bg-black/60 backdrop-blur-xs" @click="store.setProductModal(false)" />

      <!-- card -->
      <div class="relative z-10 w-full max-w-2xl overflow-hidden bg-white border border-zinc-200 shadow-2xl rounded-3xl text-zinc-900">
        <!-- close -->
        <button
          @click="store.setProductModal(false)"
          class="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors rounded-full top-4 right-4 bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- image -->
          <div class="flex items-center justify-center p-8 bg-slate-50 border-r border-zinc-100 min-h-64">
            <img
              v-if="store.$state.selectProduct.imgURL"
              :src="store.$state.selectProduct.imgURL"
              :alt="store.$state.selectProduct.title"
              class="object-contain w-full max-h-72"
            />
          </div>

          <!-- info -->
          <div class="flex flex-col justify-between gap-4 p-6">
            <div>
              <span class="text-[11px] font-mono tracking-widest uppercase text-amber-600 font-bold">
                {{ store.$state.selectProduct.category }}
              </span>
              <h2 class="mt-1 text-xl font-extrabold text-zinc-900">
                {{ store.$state.selectProduct.title }}
              </h2>
              <p class="mt-1 text-xs text-zinc-500 font-mono">{{ store.$state.selectProduct.dimension }}</p>
              <p class="mt-4 text-2xl font-black text-amber-600">
                ${{ store.$state.selectProduct.price }}
              </p>
            </div>

            <!-- arms / multi-copy input -->
            <div v-if="isMultiCopy" class="space-y-3">
              <label class="text-xs font-semibold text-zinc-700">Number of pieces</label>
              <div class="flex items-center gap-2">
                <button @click="decrement" class="flex items-center justify-center text-lg font-bold transition-colors rounded-lg w-9 h-9 bg-zinc-100 text-zinc-800 hover:bg-zinc-200">−</button>
                <input
                  v-model.number="numberOfProduct"
                  type="number" min="1" max="8"
                  class="w-16 text-sm font-semibold text-center border rounded-lg h-9 bg-slate-50 border-zinc-200 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  @input="onInput"
                />
                <button @click="increment" class="flex items-center justify-center text-lg font-bold transition-colors rounded-lg w-9 h-9 bg-zinc-100 text-zinc-800 hover:bg-zinc-200">+</button>
              </div>
            </div>

            <button
              @click="handleSelectModel"
              :disabled="(isMultiCopy && !isValid) || loadingStore.isModelLoading"
              class="flex items-center justify-center w-full gap-2 py-3 text-xs font-extrabold transition-all rounded-xl text-white"
              :class="(isMultiCopy && !isValid) || loadingStore.isModelLoading
                ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/20'"
            >
              <span v-if="loadingStore.isModelLoading" class="loading loading-spinner loading-sm"></span>
              {{ loadingStore.isModelLoading ? 'Loading...' : 'View in 3D' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { useProductStore } from "@/stores/products";
import { useLoadingStore } from "@/stores/loading";
import { computed, ref, watch } from "vue";

const emit = defineEmits(["onSelectModel"]);

const store = useProductStore();
const loadingStore = useLoadingStore();
const MULTICOPY_INPUT_CATEGORIES = new Set([168])
const isMultiCopy = computed(() =>
  MULTICOPY_INPUT_CATEGORIES.has(store.selectProduct.categoryID)
)

const numberOfProduct = ref<number>(store.$state.numberOfProduct ?? 1);
const isValid = computed(() => numberOfProduct.value >= 1 && numberOfProduct.value <= 8);

const handleSelectModel = () => {
  store.setProductModal(false);
  emit("onSelectModel");
};

const onInput = () => {
  if (numberOfProduct.value < 1) numberOfProduct.value = 1;
  if (numberOfProduct.value > 8) numberOfProduct.value = 8;
  store.$state.numberOfProduct = numberOfProduct.value;
};
const increment = () => { if (numberOfProduct.value < 8) { numberOfProduct.value++; store.$state.numberOfProduct = numberOfProduct.value; } };
const decrement = () => { if (numberOfProduct.value > 1) { numberOfProduct.value--; store.$state.numberOfProduct = numberOfProduct.value; } };

watch(numberOfProduct, (v) => { store.$state.numberOfProduct = v; });
</script>

<style scoped></style>
