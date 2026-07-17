<template>
  <modal
    @onSelectModel="onSelectModel"
    v-if="store.$state.isModalProduct"
  ></modal>
  <div class="relative w-full">
    <div
      class="border-gray-600 collapse collapse-arrow lg:rounded-l-box lg:rounded-none gap-y-2 lg:gap-y-0 lg:border-2"
      v-for="(category, index) in store.getCategories"
      :key="category.id"
      ref="el"
    >
      <input
        @click="onCategory(category.id, index)"
        type="radio"
        name="my-accordion-2"
        :disabled="isAccordionDisabled(index)"
      />
      <div
        class="m-auto text-base font-medium xl:text-xl bg-warning collapse-title"
      >
        {{ category.title }}
      </div>
      <div
        class="relative px-4 overflow-x-auto bg-gray-50 collapse-content xl:px-8"
      >
        <div
          class="flex items-center justify-between w-full px-2 mt-4 text-sm xl:text-xl"
        >
          <span>نام</span>
          <span>قطر</span>
          <span>قیمت</span>
          <span>عکس</span>
        </div>
        <ul class="grid grid-cols-1 my-5 gap-y-8 xl:w-full">
          <hr class="w-full" />
          <product
            v-for="product in getProductByCategory(category.id)"
            :key="product.id"
            :product="product"
            @onSelectModel="onSelectModel"
          ></product>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThreeJS } from "@/composables/3D/3D.config";
import { useAddModel } from "@/composables/3D/addModel";
import { useRemoveModel } from "@/composables/3D/removeModel";
import { getCategoryIndex } from "@/helpers/getCategoryIndex.js";
import { useWindowSize } from "@vueuse/core";
import { inject } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useModelStore } from "@/stores/models3D";
import { useProductStore } from "@/stores/products";
import { unref } from "vue";
import { storeToRefs } from "pinia";
import { useLoader } from "@/composables/3D/useLoader";
import { SetNumberOfProduct } from "@/helpers/setNumberOfProduct";

const { width, height } = useWindowSize(); // Get width height from vueuse composable

const setWidth = (width) => {
  // Set width for responsive 3D box
  if (width > 780) {
    return width / 1.2;
  }
  return width;
};
const setHeight = (height) => {
  // Set Height for responsive 3D box
  if (width.value > 780) {
    return height;
  }
  return height / 1.7;
};

const sceneModel = ref();
const isSceneCreated = ref(0);
const container = inject("container");

const end = ref(null);
const last = ref(null);
const store = useProductStore();
const modelStore = useModelStore();
const loadingStore = useLoadingStore();
const activeIndex = ref(-1); // No accordion is open initially
const isFirstAccordionOpened = ref(false);

const { getProductByCategory } = storeToRefs(store);

const onCategory = (categoryID, index) => {
  if (isSceneCreated.value === 0) {
    const { scene } = useThreeJS(
      // Create scene and container of 3D model
      unref(container),
      setWidth(width.value),
      setHeight(height.value)
    );
    sceneModel.value = scene;
    isSceneCreated.value++;
  }
  if (index === 0 || isFirstAccordionOpened.value) {
    activeIndex.value = activeIndex.value === index ? -1 : index;
    // If the first accordion is opened, enable all others
    if (index === 0) {
      isFirstAccordionOpened.value = true;
    }
  }
};

const onSelectModel = async () => {
  // Get and Load the 3D model
  const glbObject = store.setGlbFileArray(store.$state.selectProduct.id);

  const allIdsExist = store.$state.models.filter(
    (newItem) => glbObject.id === newItem.id
  );
  if (allIdsExist.length < 1) {
    const loader = await useLoader(glbObject, sceneModel.value);
    loader.loadingManager.onLoad = () => {
      // Remove last model and Add new model
      onAddModel();
    };
  }
};

const onAddModel = async () => {
  const categoryIndex = getCategoryIndex(store.$state.selectProduct.categoryID);
  const productResult = store.getProductByID(store.$state.selectProduct.id);
  modelStore.$state.modelSelect[categoryIndex].push(productResult[0]);
  end.value = modelStore.$state.modelSelect[categoryIndex].slice(-1)[0];
  last.value = modelStore.$state.modelSelect[categoryIndex].slice(-2)[0];
  // console.log("end", end.value, "last", last.value);
  await useRemoveModel(sceneModel.value, last.value.id);
  await useAddModel(
    sceneModel.value,
    end.value.id,
    SetNumberOfProduct(
      store.$state.numberOfProduct,
      store.$state.selectProduct.categoryID
    ),
    store.$state.selectProduct.position
  );
  modelStore.updatePrices(
    categoryIndex,
    SetNumberOfProduct(
      store.$state.numberOfProduct,
      store.$state.selectProduct.categoryID
    )
  );
  modelStore.updateOrder(
    categoryIndex,
    SetNumberOfProduct(
      store.$state.numberOfProduct,
      store.$state.selectProduct.categoryID
    )
  );
  loadingStore.isMenu = false;
  store.setProductModal(false);
};

const isAccordionDisabled = (index) => {
  if (index === 0) {
    return false; // The first accordion is never disabled
  }
  return !isFirstAccordionOpened.value; // Other accordions are disabled until the first is opened
};
</script>
