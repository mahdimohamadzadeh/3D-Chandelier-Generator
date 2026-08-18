import { useProductStore } from "@/stores/products"
import type { Scene } from "three"
import { unref, type Ref } from "vue"

export const useRemoveModel = (scene: Scene | Ref<Scene>, id: number): void => {
  if (id === undefined || id === null) return
  const store = useProductStore()
  const model = store.$state.models.find((m) => m.id.id === id)
  if (!model) return

  const instances = model.sceneInstances && model.sceneInstances.length > 0
    ? model.sceneInstances
    : Array.isArray(model.instance)
    ? model.instance
    : [model.instance];
    
  const targetScene = unref(scene);
  if (targetScene) {
    instances.forEach((instance) => {
      targetScene.remove(instance);
    });
  }
  model.sceneInstances = [];
};