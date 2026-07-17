<template>
  <li
    v-if="props.product && props.product.isStock === 'instock'"
    class="flex items-center justify-between w-full border-b-[1px] rounded p-1 cursor-pointer z-40"
  >
    <div class="flex w-full justify-around items-center">
      <h3 class="text-sm">
        {{ props.product.title }}
      </h3>
      <h3 class="text-sm">{{ props.product.dimension }}</h3>
      <span class="text-sm">{{ props.product.price }}</span>
      <button @click="onModalProduct" class="">
        <v-lazy-image
          :src="props.product.imgURL"
          class="cursor-pointer w-10 h-10"
        />
      </button>
    </div>
  </li>
</template>

<script setup>
import { useProductStore } from "@/stores/products";
import VLazyImage from "v-lazy-image";
const props = defineProps(["product"]);
const emit = defineEmits("onSelectModel");
const selectedOption = reactive({
  selectedOptionID: props.product.id,
  categoryID: props.product.categoryID,
});
const store = useProductStore();

const onModalProduct = () => {
  store.setProductModal(true, props.product);
};
</script>

<style scoped>
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-lazy-image-loaded {
  filter: blur(0);
}
</style>
