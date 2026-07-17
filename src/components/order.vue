<template>
  <div class="modal-box max-w-6xl">
    <div v-if="totalOrder.length > 0">
      <div>
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th>شماره سفارش</th>
                <th>نام محصول</th>
                <th>قطر محصول</th>
                <th>قیمت محصول</th>
              </tr>
            </thead>
            <tbody v-for="order in totalOrder" :key="order.id">
              <tr class="text-xs xl:text-sm">
                <th>{{ order.id }}</th>
                <td>{{ order.title }}</td>
                <td>{{ order.dimension }}</td>
                <td>{{ order.price }} تومان</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <span v-else>متاسفانه هنوز هیچ محصولی ثبت نکردید!!</span>
    <div class="modal-action text-right">
      <div
        v-if="totalOrder.length > 0"
        class="flex justify-between w-full items-center"
      >
        <span class="font-bold text-sm xl:text-xl"
          >مجموع خرید شما : {{ totalPrice }} تومان میباشد</span
        >
        <button @click="$emit('onBuy')" class="btn-success btn text-white">
          خرید
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModelStore } from "@/stores/models3D";

const props = defineProps(["totalOrder"]);

const modelStore = useModelStore();
const totalPrice = computed(() => modelStore.$state.totalPrice);
</script>

<style lang="scss" scoped></style>
