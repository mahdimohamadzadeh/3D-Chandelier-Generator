import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref<boolean>(false);
  const isDownload = ref<boolean>(false);
  const isMenu = ref<boolean>(false);
  const xhrLoading = ref<number | null>(null);
  const isModelLoading = ref<boolean>(false);
  return { loading, isDownload, isMenu, xhrLoading, isModelLoading };
});
