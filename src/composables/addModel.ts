import { useProductStore } from "@/stores/products";
import { setPositionForNumberOfModel } from "@/helpers/SetPositionForNumberOfModel";
import { unref } from "vue";
import type { Scene } from "three";
import type { Ref } from "vue";

export const useAddModel = (
  scene: Scene | Ref<Scene>,
  id: number,
  numberOfProducts: number,
  position: { x: number; y: number; z: number }
): void => {
  const store = useProductStore();
  const { x: positionX, y: positionY, z: positionZ } = position;

  const result = store.$state.models.find((m) => m.id.id === id);
  if (!result) return;

  const categoryID = store.getCategoryIDByProductID(result.id.id);

  const baseObject = Array.isArray(result.instance) ? result.instance[0] : result.instance;

  if (!baseObject || typeof (baseObject as any).clone !== "function") {
    console.error("Invalid model instance for id:", id);
    return;
  }

  const copies = Array.from({ length: numberOfProducts }, () =>
    (baseObject as import("three").Object3D).clone()
  );

  copies[0].position.set(positionX, positionY, positionZ);

  if (numberOfProducts > 1) {
    setPositionForNumberOfModel(copies, categoryID, result.id.id, numberOfProducts, positionX, positionY, positionZ);
  }

  const targetScene = unref(scene);
  if (targetScene) {
    copies.forEach((copy) => targetScene.add(copy));
  }
  store.setSceneInstances(result.id.id, copies);
};
