import { LoadingManager, Object3D } from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoadingStore } from "@/stores/loading";
import { useProductStore } from "@/stores/products";
import type { GlbFile } from "@/stores/products";
import type { Scene } from "three";
import { gltfLoader } from "./loaderSingleton";

export const useLoader = (
  glbFile: GlbFile,
  scene: Scene,
  onLoadCallback?: () => void
): { loadingManager: LoadingManager } => {
  const store = useProductStore();
  const loadingStore = useLoadingStore();

  const loadingManager = new LoadingManager();
  if (onLoadCallback) {
    loadingManager.onLoad = onLoadCallback;
  }

  const object = new Object3D();
  gltfLoader.manager = loadingManager
  gltfLoader.load(
    glbFile.url,
    (gltf) => {
      const model = gltf.scene
      object.add(model.clone())
      object.scale.set(55, 55, 55)
      object.position.setY(-50)
      store.addModel(object, glbFile)
      loadingStore.loading = false
      loadingStore.isDownload = true
    },
    undefined,
    (error) => {
      console.error('GLB load error:', error)
      loadingStore.loading = false
      loadingStore.isModelLoading = false
    }
  )

  return { loadingManager };
};
