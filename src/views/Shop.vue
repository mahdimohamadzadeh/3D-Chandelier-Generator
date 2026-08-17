<template>
  <div class="min-h-screen pt-20 pb-20 bg-slate-50 text-zinc-900 selection:bg-amber-500 selection:text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-800 to-amber-950 text-white p-8 sm:p-12 mb-10 shadow-xl border border-zinc-800">
        <div class="relative z-10 max-w-2xl">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <span>✦</span> Handcrafted Atelier Collection
          </span>
          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Antique & Heritage <span class="text-amber-400">Chandeliers</span>
          </h1>
          <p class="mt-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            Explore 19th-century French Empire gold leaf, Bohemian cut crystal, Venetian Murano glass, and Gothic wrought iron candelabras.
          </p>
        </div>
        <!-- Decorative background ring -->
        <div class="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <!-- Filters & Search Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all uppercase tracking-wider"
            :class="selectedCategory === cat
              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
              : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200'"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search chandelier catalog..."
            class="w-full pl-10 pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all shadow-xs"
          />
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group bg-white rounded-3xl border border-zinc-200/80 overflow-hidden shadow-xs hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
        >
          <!-- Vector Blueprint Graphic Header (No image dependency) -->
          <div class="relative aspect-4/3 cursor-pointer" @click="openQuickView(product)">
            <ChandelierIcon :archetype="product.archetype" />

            <!-- Badge -->
            <span
              v-if="product.badge"
              class="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase rounded-lg shadow-xs tracking-wider"
              :class="{
                'bg-amber-500 text-white': product.badge === 'Best Seller',
                'bg-yellow-600 text-white': product.badge === 'Antique',
                'bg-rose-500 text-white': product.badge === 'Sale',
                'bg-purple-600 text-white': product.badge === 'Rare',
              }"
            >
              {{ product.badge }}
            </span>

            <!-- Spec Pill -->
            <span class="absolute top-3 right-3 px-2 py-0.5 bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-700 text-[10px] font-mono rounded-md shadow-xs">
              {{ product.tiers }} Tiers • {{ product.socketsCount }} Lights
            </span>
          </div>

          <!-- Content -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
                <span class="uppercase tracking-wider font-semibold text-amber-600 text-[11px]">{{ product.category }}</span>
                <span class="flex items-center gap-1 text-amber-500 font-bold">
                  ★ {{ product.rating }} <span class="text-zinc-400 font-normal">({{ product.reviewsCount }})</span>
                </span>
              </div>

              <h3 class="font-bold text-zinc-900 text-base group-hover:text-amber-600 transition-colors line-clamp-1">
                {{ product.title }}
              </h3>

              <p class="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                {{ product.description }}
              </p>

              <div class="mt-3 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                <span>{{ product.dimensions }}</span>
              </div>
            </div>

            <div class="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
              <div>
                <span class="text-xl font-extrabold text-zinc-900">${{ product.price }}</span>
                <span v-if="product.originalPrice" class="text-xs text-zinc-400 line-through ml-1.5">${{ product.originalPrice }}</span>
              </div>

              <div class="flex gap-2">
                <button
                  @click="openQuickView(product)"
                  class="p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-xl text-xs transition-colors"
                  title="Quick View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>

                <button
                  @click="addToCart(product)"
                  class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95 flex items-center gap-1.5"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-zinc-200 shadow-xs">
        <p class="text-zinc-500 font-medium">No chandeliers match your filter criteria.</p>
        <button @click="selectedCategory = 'All'; searchQuery = ''" class="mt-4 px-5 py-2.5 bg-amber-500 text-white text-xs font-bold rounded-xl">
          Reset Search
        </button>
      </div>

    </div>

    <!-- Quick Spec Modal -->
    <transition name="fade">
      <div v-if="activeQuickView" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" @click.self="activeQuickView = null">
        <div class="bg-white border border-zinc-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 text-zinc-900">
          <button @click="activeQuickView = null" class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 flex items-center justify-center transition-colors">
            ✕
          </button>

          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="aspect-square bg-slate-50 flex items-center justify-center border-r border-zinc-100">
              <ChandelierIcon :archetype="activeQuickView.archetype" />
            </div>

            <div class="p-6 flex flex-col justify-between">
              <div>
                <span class="text-xs font-bold text-amber-600 uppercase tracking-widest">{{ activeQuickView.category }}</span>
                <h2 class="text-xl font-extrabold text-zinc-900 mt-1">{{ activeQuickView.title }}</h2>
                <p class="text-2xl font-black text-amber-600 mt-2">${{ activeQuickView.price }}</p>

                <p class="text-xs text-zinc-600 mt-4 leading-relaxed">{{ activeQuickView.description }}</p>

                <div class="mt-4 space-y-1.5 text-xs text-zinc-500 border-t border-zinc-100 pt-3 font-mono">
                  <p><strong class="text-zinc-800">Dimensions:</strong> {{ activeQuickView.dimensions }}</p>
                  <p><strong class="text-zinc-800">Materials:</strong> {{ activeQuickView.material }}</p>
                  <p><strong class="text-zinc-800">Architecture:</strong> {{ activeQuickView.tiers }} Tiers • {{ activeQuickView.socketsCount }} Socket Lights</p>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-zinc-100 flex gap-3">
                <button
                  @click="addToCart(activeQuickView); activeQuickView = null"
                  class="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Toast Notification -->
    <transition name="toast">
      <div v-if="toastMessage" class="fixed bottom-6 right-6 z-50 px-5 py-3 bg-zinc-900 text-white rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium border border-zinc-700">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        {{ toastMessage }}
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { shopProducts } from '@/data/shopProducts';
import type { ShopProduct } from '@/data/shopProducts';
import { useCartStore } from '@/stores/cart';
import ChandelierIcon from '@/components/ChandelierIcon.vue';

const cartStore = useCartStore();

const categories = ['All', 'Antique Chandeliers', 'Vintage', 'Classic Crystal', 'Pendant Lights'];
const selectedCategory = ref('All');
const searchQuery = ref('');

const activeQuickView = ref<ShopProduct | null>(null);
const toastMessage = ref('');

const filteredProducts = computed(() => {
  return shopProducts.filter((product) => {
    const matchesCat = selectedCategory.value === 'All' || product.category === selectedCategory.value;
    const matchesQuery = product.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCat && matchesQuery;
  });
});

const openQuickView = (product: ShopProduct) => {
  activeQuickView.value = product;
};

const addToCart = (product: ShopProduct) => {
  cartStore.addShopProduct(product);
  toastMessage.value = `Added "${product.title}" to cart!`;
  setTimeout(() => {
    toastMessage.value = '';
  }, 2500);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(20px); }
</style>
