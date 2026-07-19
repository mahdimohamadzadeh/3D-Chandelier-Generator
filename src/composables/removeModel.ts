import { useProductStore } from "@/stores/products"
import { Scene } from "three"

export const useRemoveModel = (scene: Scene, id: number): void => {
  if (id === undefined || id === null) return
  const store = useProductStore()
  const model = store.$state.models.find((m) => m.id.id === id)
  if (!model) return

  const instances = Array.isArray(model.instance) ? model.instance : [model.instance]
  instances.forEach((instance) => {
    instance.traverse((obj: any) => {
      if (obj.geometry) obj.geometry.dispose()
      if (obj.material) {
        Array.isArray(obj.material)
          ? obj.material.forEach((m: any) => m.dispose())
          : obj.material.dispose()
      }
    })
    scene.remove(instance)
  })
}