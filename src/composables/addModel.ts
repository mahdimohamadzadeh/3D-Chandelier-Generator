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

  if (numberOfProducts <= 1) {
    (result.instance as import("three").Object3D).position.set(positionX, positionY, positionZ);
    unref(scene).add(result.instance as import("three").Object3D);
    store.addModel(result.instance as import("three").Object3D, result.id);
    return;
  }

  const copies = Array.from({ length: numberOfProducts }, () =>
    (result.instance as import("three").Object3D).clone()
  );

  copies[0].position.set(positionX, positionY, positionZ);

  setPositionForNumberOfModel(copies, categoryID, result.id.id, numberOfProducts, positionX, positionY, positionZ);

  copies.forEach((copy) => unref(scene).add(copy));
  store.addModel(copies, result.id);
};
