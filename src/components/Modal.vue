<template>
  <div class="z-50 fixed mt-20">
    <button
      @click="store.setProductModal(false)"
      class="btn btn-circle btn-warning text-white fixed left-10 top-20 flex justify-center items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <div
      class="w-full h-screen bg-black fixed top-0 opacity-70 -z-10 right-0"
    ></div>
    <div
      class="mx-auto fixed w-1/2 flex xl:right-1/4 md:right-36 2xl:right-1/3 "
    >
      <div class="card lg:card-side shadow-xl">
        <v-lazy-image
          :src="store.$state.selectProduct.imgURL"
          alt="product-image"
          class="rounded-md max-w-xs md:max-w-2xl sm:h-[300px] md:h-auto"
        />

        <div
          class="card-actions justify-end absolute lg:bottom-4 lg:right-40 right-32 md:right-1/3 bottom-2"
        >
          <form
            v-if="store.$state.selectProduct.categoryID === 168"
            @submit.prevent="$emit('onSelectModel')"
            class="flex items-center"
          >
            <div class="absolute flex gap-x-6 -right-5 -top-16 md:block md:relative md:top-0">
              <span class="">تعداد شاخه ها : </span>
              <input
                v-model="numberOfProduct"
                type="text"
                class="input input-bordered input-accent max-w-[80px] h-1/2 mt-5"
                min="1"
                max="8"
                @input="validateInput"
              />
            </div>
            <button
              :disabled="!isInputValid"
              type="submit"
              class="btn btn-warning absolute top-12 md:relative md:top-0"
            >
              نمایش شاخه ها
            </button>
          </form>
          <button
            v-else
            @click="$emit('onSelectModel')"
            class="btn btn-warning lg:mr-20"
          >
            نمایش سه بعدی
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import VLazyImage from "v-lazy-image";
import { useProductStore } from "@/stores/products";

const store = useProductStore();

const numberOfProduct = ref(store.$state.numberOfProduct);

const isInputValid = computed(() => {
  return numberOfProduct.value >= 1 && numberOfProduct.value <= 8;
});

const validateInput = () => {
  if (+numberOfProduct.value < 1 || +numberOfProduct.value > 8) {
    // If the input is out of range, set it to null
    numberOfProduct.value = null;
  }
  store.$state.numberOfProduct = +numberOfProduct.value;
};
</script>

<style lang="scss" scoped></style>
