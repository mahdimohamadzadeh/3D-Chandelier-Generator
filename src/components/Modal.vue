<template>
  <teleport to="body">
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- backdrop -->
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="store.setProductModal(false)" />

      <!-- card -->
      <div class="relative z-10 w-full max-w-2xl overflow-hidden bg-white shadow-2xl rounded-2xl">
        <!-- close -->
        <button
          @click="store.setProductModal(false)"
          class="absolute z-10 flex items-center justify-center w-8 h-8 transition-colors rounded-full top-4 right-4 bg-zinc-100 hover:bg-zinc-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="grid grid-cols-1 md:grid-cols-2">
          <!-- image -->
          <div class="flex items-center justify-center p-8 bg-zinc-50 min-h-64">
            <v-lazy-image
              :src="store.$state.selectProduct.imgURL"
              alt="product"
              class="object-contain w-full max-h-72"
            />
          </div>

          <!-- info -->
          <div class="flex flex-col justify-between gap-4 p-6">
            <div>
              <span class="text-xs font-semibold tracking-widest uppercase text-amber-500">
                {{ store.$state.selectProduct.category }}
              </span>
              <h2 class="mt-1 text-xl font-bold text-zinc-900">
                {{ store.$state.selectProduct.title }}
              </h2>
              <p class="mt-1 text-sm text-zinc-500">{{ store.$state.selectProduct.dimension }}</p>
              <p class="mt-4 text-2xl font-bold text-zinc-800">
                ${{ store.$state.selectProduct.price }}
              </p>
            </div>

            <!-- arms / multi-copy input -->
            <div v-if="isMultiCopy" class="space-y-3">
              <label class="text-sm font-medium text-zinc-700">Number of pieces</label>
              <div class="flex items-center gap-2">
                <button @click="decrement" class="flex items-center justify-center text-lg font-bold transition-colors rounded-lg w-9 h-9 bg-zinc-100 hover:bg-zinc-200">−</button>
                <input
                  v-model.number="numberOfProduct"
                  type="number" min="1" max="8"
                  class="w-16 text-sm font-semibold text-center border rounded-lg h-9 border-zinc-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  @input="onInput"
                />
                <button @click="increment" class="flex items-center justify-center text-lg font-bold transition-colors rounded-lg w-9 h-9 bg-zinc-100 hover:bg-zinc-200">+</button>
              </div>
            </div>

            <button
              @click="$emit('onSelectModel')"
              :disabled="(isMultiCopy && !isValid) || loadingStore.isModelLoading"
              class="flex items-center justify-center w-full gap-2 py-3 text-sm font-semibold transition-all rounded-xl"
              :class="(isMultiCopy && !isValid) || loadingStore.isModelLoading
                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg'"
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
import VLazyImage from "v-lazy-image";
import { useProductStore } from "@/stores/products";
import { useLoadingStore } from "@/stores/loading";
import { computed, ref, watch } from "vue";

defineEmits(["onSelectModel"]);

const store = useProductStore();
const loadingStore = useLoadingStore();
const MULTICOPY_INPUT_CATEGORIES = new Set([168])
const isMultiCopy = computed(() =>
  MULTICOPY_INPUT_CATEGORIES.has(store.selectProduct.categoryID)
)

const numberOfProduct = ref<number>(store.$state.numberOfProduct ?? 1);
const isValid = computed(() => numberOfProduct.value >= 1 && numberOfProduct.value <= 8);

const onInput = () => {
  if (numberOfProduct.value < 1) numberOfProduct.value = 1;
  if (numberOfProduct.value > 8) numberOfProduct.value = 8;
  store.$state.numberOfProduct = numberOfProduct.value;
};
const increment = () => { if (numberOfProduct.value < 8) { numberOfProduct.value++; store.$state.numberOfProduct = numberOfProduct.value; } };
const decrement = () => { if (numberOfProduct.value > 1) { numberOfProduct.value--; store.$state.numberOfProduct = numberOfProduct.value; } };

watch(numberOfProduct, (v) => { store.$state.numberOfProduct = v; });
</script>

<style scoped>
.v-lazy-image { filter: blur(8px); transition: filter 0.5s; }
.v-lazy-image-loaded { filter: blur(0); }
</style>
