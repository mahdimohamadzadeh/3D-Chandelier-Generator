<template>
  <div class="flex flex-col justify-between w-full md:flex-row gap-x-10">
    <div
      v-show="loadingStore.isMenu && isHeroMobile === false"
      class="w-screen fixed h-screen top-[70px] overflow-y-auto lg:hidden z-20 pb-20"
    ></div>
    <div
      v-show="loadingStore.isMenu && isHeroDesktop === false"
      class="absolute right-0 z-20 w-full top-20 md:w-1/3"
    >
      <div
        class="fixed top-0 w-screen h-screen bg-black opacity-70 -z-10"
      ></div>
      <keep-alive>
        <accordion-categories />
      </keep-alive>
    </div>
    <desktop-hero
      v-if="isHeroDesktop"
      @on-start="onStartDesktop"
      class="invisible overflow-hidden xl:visible"
    ></desktop-hero>
    <button
      v-show="
        loadingStore.isMenu &&
        !store.$state.isModalProduct &&
        (isHeroMobile === false || isHeroDesktop === false)
      "
      @click="loadingStore.isMenu = false"
      class="absolute z-40 hidden text-white btn btn-circle btn-warning left-10 top-4 lg:flex lg:justify-center lg:items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
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

    <hero-mobile
      v-if="isHeroMobile"
      @on-start="onStartHero"
      class="absolute overflow-hidden xl:hidden top-10"
    ></hero-mobile>
    <div class="w-full px-6 mt-10 overflow-hidden">
      <div
        class="flex flex-col md:fixed lg:right-24 xl:right-40 lg:top-40"
        v-show="store.$state.models.length > 0"
      >
        <div class="flex items-center justify-center w-full rounded-md">
          <section
            ref="container"
            class="h-[400px] rounded-xl shadow-amber-100 shadow lg:h-[650px]"
          ></section>
          <!-- <img class="absolute bottom-[190px] -z-10 w-[120px]" src="/8 sides.jpg" alt=""> -->
        </div>
        <div class="flex items-center justify-between w-full gap-x-3 mt-7">
          <span class="text-sm font-semibold xl:text-xl"
            >قیمت مجموع: {{ totalPrice }} تومان</span
          >
          <button
            class="z-0 text-white btn btn-warning"
            onclick="my_modal_2.showModal()"
          >
            نمایش فاکتور
          </button>
        </div>
        <dialog id="my_modal_2" class="modal">
          <order :totalOrder="totalOrder" @on-buy="onBuy" />
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";
import { useModelStore } from "@/stores/models3D";
import { useProductStore } from "@/stores/products";
import axios from "axios";
import { useRouter } from "vue-router";
import { provide } from "vue";

const baseURL = import.meta.env.VITE_BASE_URL;
const consumerKey = import.meta.env.VITE_CONSUMER_KEY;
const consumerSecret = import.meta.env.VITE_CONSUMER_SECRET;

const router = useRouter();
const axiosInstance = axios.create({
  baseURL,
  // Set user pass for resAPI
  consumerKey: consumerKey,
  consumerSecret: consumerSecret,
});

const modelStore = useModelStore();
const store = useProductStore();
const loadingStore = useLoadingStore();
const container = ref();
const totalPrice = computed(() => modelStore.$state.totalPrice);
const totalOrder = computed(() => modelStore.$state.totalOrder);

const onBuy = () => {
  const postDataAndRedirect = async () => {
    const finalOrders = totalOrder.value.map((order) => {
      return {
        product_id: +order.id,
        quantity: 1,
      };
    });
    for (const order of finalOrders) {
      let stringOrderID = order.product_id.toString();
      let stringOrderQuantity = order.quantity.toString();
      try {
        await axiosInstance.post(`/cart/add-item`, {
          id: stringOrderID,
          quantity: stringOrderQuantity,
        });
      } catch (error) {
        console.error(`Error fetching data for item ${item}:`, error);
      }
    }
    router.replace("");
    window.location.href = "https://shahanluster.com/cart/";
  };
  postDataAndRedirect();
};

const isHeroMobile = ref(true);
const isHeroDesktop = ref(true);
const onStartHero = () => {
  isHeroDesktop.value = false;
  isHeroMobile.value = false;
  loadingStore.isMenu = true;
  window.scrollTo(0, 0);
};

const onStartDesktop = () => {
  isHeroDesktop.value = false;
  loadingStore.isMenu = true;
  window.scrollTo(0, 0);
};

provide("container", container);
</script>

<style scoped>
#element {
  width: 900px;
  height: 700px;
}
</style>
