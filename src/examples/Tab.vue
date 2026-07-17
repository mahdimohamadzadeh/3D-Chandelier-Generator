<template>
  <div class="w-1/3 shadow-xl card bg-base-100">
    <div class="">
      <div v-for="index in tabs" :key="index"></div>
    </div>
    <div class="card-body">
      <div class="">
        <slot :tab="tabs[activeTab]"></slot>
      </div>
      <div class="flex items-center justify-between card-actions">
        <button
          @click="nextTab"
          :disabled="activeTab === tabs.length - 1"
          class="btn btn-info"
        >
          بعدی
        </button>
        <span>{{ tabs[activeTab].price }} تومان</span>
        <button
          @click="prevTab"
          :disabled="activeTab === 0"
          class="btn btn-info"
        >
          قبلی
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["activeIndex"]);
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: [],
  },
});

const activeTab = ref(0);

const nextTab = () => {
  if (activeTab.value < props.tabs.length - 1) {
    activeTab.value++;
    emit("activeIndex", activeTab.value);
  }
};

const prevTab = () => {
  if (activeTab.value > 0) {
    activeTab.value--;
    emit("activeIndex", activeTab.value);
  }
};
</script>

<style lang="scss" scoped></style>
