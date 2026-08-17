import { LoadingManager, Object3D } from "three";
import { useLoadingStore } from "@/stores/loading";
import { useProductStore } from "@/stores/products";
import type { GlbFile } from "@/stores/products";
import type { Scene } from "three";
import { loadEncryptedGLB } from "./loadEncryptedGLB";

export const useLoader = (
  glbFile: GlbFile,
  scene: Scene,
  onLoadCallback?: () => void
): { loadingManager: LoadingManager } => {
  const store = useProductStore();
  const loadingStore = useLoadingStore();

  const loadingManager = new LoadingManager();

  loadingStore.isModelLoading = true;
  loadingStore.xhrLoading = 0;

  const object = new Object3D();
  loadEncryptedGLB(
    glbFile.url,
    (gltf) => {
      const model = gltf.scene;
      object.add(model.clone());
      object.scale.set(55, 55, 55);
      object.position.setY(-50);
      store.addModel(object, glbFile);
      loadingStore.isDownload = true;
      loadingStore.xhrLoading = 100;
      loadingStore.isModelLoading = false;
      onLoadCallback?.();
    },
    (error) => {
      console.error('GLB load error:', error);
      loadingStore.loading = false;
      loadingStore.isModelLoading = false;
    },
    (percent) => {
      loadingStore.xhrLoading = percent;
    }
  );

  return { loadingManager };
};
