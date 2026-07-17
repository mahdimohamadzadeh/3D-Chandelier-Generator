import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const loading = ref(false);
  const isDownload = ref(false);
  const isMenu = ref(false);
  const xhrLoading = ref(null);
  return { loading, isDownload, isMenu, xhrLoading };
});
