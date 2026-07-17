<template>
  <div class="navbar bg-gray-600 shadow-md rounded-b-lg relative">
    <div class="navbar-start">
      <button
        @click="onMenu"
        class="btn btn-ghost btn-circle flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
          viewBox="0 0 24 24"
        >
          <path fill="#ffffff" d="M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z" />
        </svg>
      </button>
    </div>
    <div class="navbar-center md:navbar-start">
      <a
        href="https://shahanluster.com/"
        class="md:absolute md:right-20 "
        ><img src="/logo.png" alt="logo" class="w-16 h-14" />
        <!-- <span>شاهان لوستر</span> -->
      </a>
      <div class="justify-center w-full hidden md:flex">
        <ul class="flex justify-around text-white items-center w-7/12">
          <li
            class="hover:border-b-2 hover:border-accent btn btn-ghost lg:text-xl"
          >
            <a href="https://shahanluster.com/" target="_blank">خانه</a>
          </li>
          <li
            class="hover:border-b-2 hover:border-accent btn btn-ghost lg:text-xl"
          >
            <a href="https://shahanluster.com/shop/" target="_blank">فروشگاه</a>
          </li>
          <li
            class="hover:border-b-2 hover:border-accent btn btn-ghost lg:text-xl"
          >
            <a href="https://shahanluster.com/contact-us/" target="_blank"
              >تماس با ما</a
            >
          </li>
          <li
            class="hover:border-b-2 hover:border-accent btn btn-ghost lg:text-xl"
          >
            <a href="https://shahanluster.com/shahan-blog/" target="_blank"
              >مقاله</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
        <div class="indicator">
          <a href="https://shahanluster.com/cart/" target="_blank"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M6 22q-.825 0-1.412-.587T4 20V8q0-.825.588-1.412T6 6h2q0-1.65 1.175-2.825T12 2t2.825 1.175T16 6h2q.825 0 1.413.588T20 8v12q0 .825-.587 1.413T18 22zm0-2h12V8h-2v2q0 .425-.288.713T15 11t-.712-.288T14 10V8h-4v2q0 .425-.288.713T9 11t-.712-.288T8 10V8H6zm4-14h4q0-.825-.587-1.412T12 4t-1.412.588T10 6M6 20V8z"
              /></svg
          ></a>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();
const onMenu = () => {
  loadingStore.isMenu = !loadingStore.isMenu;
};
</script>

<style lang="scss" scoped></style>
