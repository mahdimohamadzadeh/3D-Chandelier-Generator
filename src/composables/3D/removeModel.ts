import { unref } from "vue";
import { useProductStore } from "@/stores/products";
import type { Object3D, Scene } from "three";
import type { Ref } from "vue";

export const useRemoveModel = (scene: Scene | Ref<Scene>, id: number): void => {
  if (id === undefined || id === null) return;
  const store = useProductStore();
  const model = store.$state.models.find((m) => m.id.id === id);
  if (!model) return;

  if (Array.isArray(model.instance)) {
    model.instance.forEach((instance) => unref(scene).remove(instance as Object3D));
  } else {
    unref(scene).remove(model.instance as Object3D);
  }
};
