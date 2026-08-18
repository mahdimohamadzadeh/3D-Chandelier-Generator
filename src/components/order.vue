<template>
  <div class="modal-box max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-zinc-200 text-zinc-900">
    <h3 class="font-extrabold text-xl text-zinc-900 mb-4 border-b border-zinc-100 pb-3 flex items-center gap-2">
      <span class="text-amber-500">✦</span> Custom 3D Assembly Breakdown
    </h3>

    <div v-if="totalOrder.length > 0">
      <div class="overflow-x-auto">
        <table class="table w-full text-left">
          <thead>
            <tr class="text-xs uppercase tracking-wider text-zinc-400 border-b border-zinc-200 font-mono">
              <th class="py-3 px-2">Part ID</th>
              <th class="py-3 px-2">Component Name</th>
              <th class="py-3 px-2">Dimensions</th>
              <th class="py-3 px-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, idx) in totalOrder" :key="idx" class="border-b border-zinc-100 text-sm hover:bg-slate-50">
              <td class="py-3 px-2 font-mono text-xs text-amber-600">#{{ order.id }}</td>
              <td class="py-3 px-2 font-semibold text-zinc-800">{{ order.title }}</td>
              <td class="py-3 px-2 text-zinc-500 text-xs font-mono">{{ order.dimension || 'Standard' }}</td>
              <td class="py-3 px-2 font-black text-amber-600 text-right">${{ order.price }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="py-8 text-center text-zinc-400 text-sm">
      No 3D components selected yet. Use the configurator to add arms, sockets, or bulbs.
    </div>

    <div class="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div v-if="totalOrder.length > 0">
        <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">Total Configured Assembly Price</span>
        <span class="font-black text-2xl text-amber-600">${{ totalPrice }}</span>
      </div>

      <div class="flex gap-3 w-full sm:w-auto justify-end">
        <button
          v-if="totalOrder.length > 0"
          @click="handleAddToCart"
          class="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
        >
          Add to Cart & Checkout →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModelStore } from "@/stores/models3D";
import { useCartStore } from "@/stores/cart";
import { useRouter } from 'vue-router';
import type { ProductOrder } from '@/stores/models3D';

const props = defineProps<{ totalOrder: ProductOrder[] }>();
const emit = defineEmits(['onBuy']);

const modelStore = useModelStore();
const cartStore = useCartStore();
const router = useRouter();

const totalPrice = computed(() => modelStore.$state.totalPrice);

const handleAddToCart = () => {
  if (props.totalOrder.length > 0) {
    cartStore.addCustom3DOrder(props.totalOrder, totalPrice.value);
    emit('onBuy');
    router.push('/cart');
  }
};
</script>

<style scoped></style>
