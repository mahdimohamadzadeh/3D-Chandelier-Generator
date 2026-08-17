<template>
  <div class="min-h-screen pt-20 pb-20 bg-slate-50 text-zinc-900 selection:bg-amber-500 selection:text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Page Title -->
      <div class="mb-8 flex items-center justify-between border-b border-zinc-200 pb-5">
        <div>
          <h1 class="text-3xl font-extrabold text-zinc-900 tracking-tight">Shopping Cart</h1>
          <p class="text-xs sm:text-sm text-zinc-500 mt-1">Review your selected heritage lighting items and custom 3D chandelier assemblies.</p>
        </div>
        <span v-if="cartStore.items.length > 0" class="text-xs font-extrabold px-3.5 py-1 bg-amber-100 text-amber-800 rounded-full">
          {{ cartStore.totalItemsCount }} Item{{ cartStore.totalItemsCount > 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Main Cart Layout -->
      <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- Cart Items List (2 Columns) -->
        <div class="lg:col-span-2 space-y-4">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-amber-300"
          >
            <!-- Vector Archetype Icon & Info -->
            <div class="flex items-center gap-4 flex-1">
              <div class="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0 border border-zinc-200">
                <ChandelierIcon :archetype="item.archetype" />
              </div>

              <div>
                <span
                  class="inline-block px-2 py-0.5 text-[10px] font-extrabold uppercase rounded tracking-wider mb-1"
                  :class="item.type === 'custom_3d' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-zinc-100 text-zinc-600'"
                >
                  {{ item.type === 'custom_3d' ? '3D Custom Order' : 'Shop Product' }}
                </span>
                <h3 class="font-bold text-zinc-900 text-base leading-snug">{{ item.title }}</h3>
                <p v-if="item.details" class="text-xs text-zinc-500 mt-0.5 line-clamp-1 font-mono">{{ item.details }}</p>
                <p class="text-sm font-extrabold text-amber-600 mt-1">${{ item.price }}</p>
              </div>
            </div>

            <!-- Quantity & Actions -->
            <div class="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
              <!-- Quantity Controls -->
              <div class="flex items-center border border-zinc-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                  class="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 transition-colors font-bold"
                >
                  -
                </button>
                <span class="w-10 text-center text-xs font-bold text-zinc-800">{{ item.quantity }}</span>
                <button
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 transition-colors font-bold"
                >
                  +
                </button>
              </div>

              <!-- Item Total Price -->
              <div class="text-right min-w-[80px]">
                <p class="text-base font-extrabold text-zinc-900">${{ item.price * item.quantity }}</p>
              </div>

              <!-- Remove button -->
              <button
                @click="cartStore.removeItem(item.id)"
                class="p-2 text-zinc-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                title="Remove Item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Clear Cart button -->
          <div class="flex justify-between items-center pt-2">
            <router-link to="/shop" class="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              ← Continue Shopping
            </router-link>
            <button @click="cartStore.clearCart()" class="text-xs font-medium text-zinc-400 hover:text-rose-600 underline">
              Clear Entire Cart
            </button>
          </div>
        </div>

        <!-- Order Summary Sidebar (1 Column) -->
        <div class="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-sm flex flex-col justify-between h-fit space-y-6">
          <div>
            <h2 class="text-lg font-extrabold text-zinc-900 border-b border-zinc-100 pb-3">Order Summary</h2>

            <!-- Promo Code Form -->
            <div class="my-4">
              <label class="block text-xs font-semibold text-zinc-600 mb-1.5">Promo Code</label>
              <div class="flex gap-2">
                <input
                  v-model="promoInput"
                  type="text"
                  placeholder="Try LUSTER10"
                  class="flex-1 px-3 py-2 text-xs bg-slate-50 border border-zinc-200 text-zinc-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 uppercase"
                />
                <button
                  @click="onApplyPromo"
                  class="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Apply
                </button>
              </div>
              <p v-if="promoError" class="text-[11px] text-rose-500 mt-1 font-medium">{{ promoError }}</p>
              <p v-if="cartStore.promoCode" class="text-[11px] text-emerald-600 mt-1 font-medium">✓ Promo code LUSTER10 applied (10% OFF)!</p>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-3 text-xs text-zinc-600 border-t border-zinc-100 pt-4 font-mono">
              <div class="flex justify-between">
                <span>Subtotal</span>
                <span class="font-bold text-zinc-900">${{ cartStore.subtotal }}</span>
              </div>

              <div v-if="cartStore.discount > 0" class="flex justify-between text-emerald-600 font-semibold">
                <span>Discount (10%)</span>
                <span>-${{ cartStore.discount }}</span>
              </div>

              <div class="flex justify-between">
                <span>Estimated Shipping</span>
                <span class="font-bold text-zinc-900">
                  {{ cartStore.shipping === 0 ? 'FREE' : `$${cartStore.shipping}` }}
                </span>
              </div>

              <div class="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span class="font-bold text-zinc-900">${{ cartStore.tax }}</span>
              </div>

              <div class="flex justify-between text-base font-black text-zinc-900 border-t border-zinc-200 pt-3 font-sans">
                <span>Total</span>
                <span class="text-amber-600">${{ cartStore.grandTotal }}</span>
              </div>
            </div>
          </div>

          <!-- Checkout Button -->
          <button
            @click="onCheckout"
            class="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Proceed to Checkout
          </button>
        </div>

      </div>

      <!-- Empty Cart State -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-zinc-200 shadow-xs max-w-2xl mx-auto">
        <div class="w-20 h-20 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 class="text-2xl font-extrabold text-zinc-900">Your cart is empty</h2>
        <p class="text-xs sm:text-sm text-zinc-500 mt-2 max-w-md mx-auto">
          Start building your custom 3D chandelier configuration or browse our heritage atelier shop catalog.
        </p>

        <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <router-link
            to="/"
            class="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-extrabold text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all"
          >
            ✦ Build Custom 3D Chandelier
          </router-link>
          <router-link
            to="/shop"
            class="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs rounded-xl transition-all"
          >
            Explore Atelier Catalog
          </router-link>
        </div>
      </div>

    </div>

    <!-- Checkout Confirmation Modal -->
    <transition name="fade">
      <div v-if="orderCompleted" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div class="bg-white border border-zinc-200 rounded-3xl max-w-md w-full p-8 text-center shadow-2xl relative animate-in fade-in zoom-in duration-300 text-zinc-900">
          <div class="w-16 h-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 class="text-2xl font-black text-zinc-900">Order Confirmed!</h2>
          <p class="text-xs text-zinc-500 mt-1 font-mono">Order #LUST-{{ Math.floor(100000 + Math.random() * 900000) }}</p>

          <p class="text-xs text-zinc-600 mt-4 leading-relaxed">
            Thank you for your purchase. We are preparing your order and handcrafted components in our atelier.
          </p>

          <button
            @click="finishOrder"
            class="w-full mt-6 py-3.5 bg-zinc-900 text-white font-bold text-xs rounded-xl transition-all"
          >
            Back to Studio Home
          </button>
        </div>
      </div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import ChandelierIcon from '@/components/ChandelierIcon.vue';

const cartStore = useCartStore();
const router = useRouter();

const promoInput = ref('');
const promoError = ref('');
const orderCompleted = ref(false);

const onApplyPromo = () => {
  promoError.value = '';
  const success = cartStore.applyPromoCode(promoInput.value);
  if (!success) {
    promoError.value = 'Invalid promo code. Use LUSTER10 for 10% off.';
  }
};

const onCheckout = () => {
  orderCompleted.value = true;
};

const finishOrder = () => {
  cartStore.clearCart();
  orderCompleted.value = false;
  router.push('/');
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
