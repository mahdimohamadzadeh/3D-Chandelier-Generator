<template>
  <div class="flex justify-between">
    <div class="w-2/3">
      <test3-d-model :showTire="showTire" />
    </div>
    <div
      class="w-1/3 flex flex-col mt-[100px] h-[40rem] items-center justify-between relative"
    >
      <div class="border-b-[1px] w-full text-center">Tire</div>
      <div class="w-full text-center">Select your Tire!</div>
      <div class="w-11/12 ml-10">
        <ul class="flex flex-col gap-10">
          <li class="flex items-center justify-between" v-for="n in 1">
            <input
              name="tire"
              type="checkbox"
              id="1234"
              v-model="showTire"
              class="checkbox"
            />
            <img
              class="rounded-lg"
              width="200px"
              src="https://www.bridgestone.co.th/content/dam/bridgestone/consumer/bst/apac/th/News/news2021/Bridgestone%20Huracan%20STO.jpg"
              alt=""
            />
            <h2 class="">Lamborghini Huracan tyres</h2>
          </li>
        </ul>
      </div>
      <div class="flex items-center justify-center w-full gap-x-4">
        <span class="text-2xl">$3,297.00</span>
        <button class="text-white btn btn-info">add to card</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getProducts } from "../service/WooCommerceService";
import { ref, onMounted} from "vue";
import test3DModel from "./test3DModel.vue";

const product = ref([]);

</script>

<style lang="scss" scoped></style>
