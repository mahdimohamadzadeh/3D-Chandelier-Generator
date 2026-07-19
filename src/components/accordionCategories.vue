<template>
  <modal v-if="store.$state.isModalProduct" @onSelectModel="onSelectModel" />

  <div class="flex flex-col h-full">
    <!-- category tabs -->
    <div class="flex-1 p-3 space-y-1 overflow-y-auto">
      <div
        v-for="(category, index) in store.getCategories.filter(Boolean)"
        :key="category.id"
      >
        <!-- category header -->
        <button
          @click="onCategory(category.id, index)"
          :disabled="isAccordionDisabled(index)"
          class="flex items-center justify-between w-full px-4 py-3 text-left transition-all rounded-xl"
          :class="activeIndex === index
            ? 'bg-amber-500 text-white shadow-md'
            : isAccordionDisabled(index)
              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              : 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200'"
        >
          <div class="flex items-center gap-3">
            <span class="flex items-center justify-center text-xs font-bold rounded-full w-7 h-7"
              :class="activeIndex === index ? 'bg-white text-amber-500' : 'bg-zinc-100 text-zinc-500'">
              {{ index + 1 }}
            </span>
            <span class="text-sm font-semibold">{{ category.title }}</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-200"
            :class="activeIndex === index ? 'rotate-180' : ''"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- product list -->
        <transition name="slide">
          <div v-if="activeIndex === index" class="pl-2 mt-1 ml-2 border-l-2 border-amber-300">
            <ul class="space-y-1">
              <product
                v-for="product in getProductByCategory(category.id)"
                :key="product.id"
                :product="product"
                @onSelectModel="onSelectModel"
              />
            </ul>
            <p v-if="getProductByCategory(category.id).length === 0" class="px-3 py-2 text-xs text-zinc-400">
              No products available
            </p>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAddModel } from "@/composables/addModel";
import { useRemoveModel } from "@/composables/removeModel";
import { getCategoryIndex } from "@/helpers/getCategoryIndex";
import { useWindowSize } from "@vueuse/core";
import { inject, ref, unref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useModelStore } from "@/stores/models3D";
import { useProductStore } from "@/stores/products";
import { storeToRefs } from "pinia";
import { useLoader } from "@/composables/useLoader";
import { SetNumberOfProduct } from "@/helpers/setNumberOfProduct";
import type { Scene } from "three";
import { getOrCreateScene } from "@/composables/sceneSingleton";

const { width, height } = useWindowSize();
const setWidth = (w: number) => (w > 780 ? w / 1.2 : w);
const setHeight = (h: number) => (width.value > 780 ? h : h / 1.7);

const sceneModel = ref<Scene>();
const isSceneCreated = ref(0);
const container = inject("container");
const store = useProductStore();
const modelStore = useModelStore();
const loadingStore = useLoadingStore();
const activeIndex = ref(-1);
const { getProductByCategory } = storeToRefs(store);



const ARMS_CATEGORY_ID = 168
const SOCKET_CATEGORY_ID = 170
const BULB_CATEGORY_ID = 169

const onCategory = (categoryID: number, index: number) => {
  const el = unref(container) as HTMLElement | null
  if (isSceneCreated.value === 0) {
    if (!el) {
      console.warn('Container not ready yet')
      return
    }
    const context = getOrCreateScene(el, setWidth(width.value), setHeight(height.value))
    sceneModel.value = context.scene
    isSceneCreated.value = 1
  }
  activeIndex.value = activeIndex.value === index ? -1 : index
}


const onSelectModel = async () => {
  loadingStore.isModelLoading = true
  const selectedProduct = { ...store.$state.selectProduct }
  const categoryID = selectedProduct.categoryID

  let numberOfProduct: number

  if (categoryID === ARMS_CATEGORY_ID) {
    numberOfProduct = SetNumberOfProduct(store.$state.numberOfProduct ?? 1, categoryID)
    modelStore.setArmsCount(numberOfProduct)

    await clearDependentCategories()
  } else if (categoryID === SOCKET_CATEGORY_ID || categoryID === BULB_CATEGORY_ID) {
    numberOfProduct = modelStore.armsCount
  } else {
    numberOfProduct = 1
  }

  const glbObject = store.setGlbFileArray(selectedProduct.id)
  const exists = store.$state.models.some((m) => glbObject.id === m.id.id)

  const completeSelection = async () => {
    try {
      await onAddModel(selectedProduct.id, categoryID, numberOfProduct)
    } catch (error) {
      console.error(error)
    }
    loadingStore.isModelLoading = false
  }

  if (exists) await completeSelection()
  else useLoader(glbObject, sceneModel.value as Scene, completeSelection)
}

const clearDependentCategories = async () => {
  const socketIndex = getCategoryIndex(SOCKET_CATEGORY_ID)
  const bulbIndex = getCategoryIndex(BULB_CATEGORY_ID)

  for (const idx of [socketIndex, bulbIndex]) {
    const arr = modelStore.modelSelect[idx]
    const lastSelected = arr[arr.length - 1]
    if (lastSelected) {
      await useRemoveModel(sceneModel.value as Scene, lastSelected.id)
    }
    modelStore.resetCategory(idx)
  }
}

const onAddModel = async (
  productID: number,
  categoryID: number,
  numberOfProduct: number
) => {
  debugger
  const categoryIndex = getCategoryIndex(categoryID);
  const selectedProduct = store.getProductByID(productID)[0];
  modelStore.$state.modelSelect[categoryIndex].push(selectedProduct as unknown as import("@/stores/models3D").ProductOrder);

  const arr = modelStore.modelSelect[categoryIndex]
  const end = arr[arr.length - 1]
  const last = arr.length > 1 ? arr[arr.length - 2] : null
  
  if (last) {
    await useRemoveModel(sceneModel.value as Scene, last.id as number)
  }
  await useAddModel(
    sceneModel.value as Scene,
    end.id as number,
    numberOfProduct,
    selectedProduct.position
  )
  modelStore.updatePrices(categoryIndex, numberOfProduct);
  modelStore.updateOrder(categoryIndex, numberOfProduct);
  loadingStore.isModelLoading = false;
  loadingStore.isMenu = false;
  store.setProductModal(false);
};

const isAccordionDisabled = (index: number): boolean => {
  const socketIdx = getCategoryIndex(SOCKET_CATEGORY_ID)
  const bulbIdx = getCategoryIndex(BULB_CATEGORY_ID)
  if ((index === socketIdx || index === bulbIdx) && modelStore.modelSelect[getCategoryIndex(ARMS_CATEGORY_ID)].length === 0) {
    return true
  }
  return false
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
