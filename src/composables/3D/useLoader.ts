import { LoadingManager, Object3D } from "three";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { useLoadingStore } from "@/stores/loading";
import { useProductStore } from "@/stores/products";
import type { GlbFile } from "@/stores/products";
import type { Scene } from "three";

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
  const loader = new GLTFLoader(loadingManager);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderConfig({ type: "js" });
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  loader.setDRACOLoader(dracoLoader);

  if (glbFile) {
    loadingStore.loading = true;
    loadingStore.isDownload = false;

    loader.load(glbFile.url, (gltf: { scene: import("three").Group }) => {
      loadingStore.loading = false;
      const model = gltf.scene;
      object.add(model.clone());
      object.scale.set(55, 55, 55);
      object.position.setY(-50);
      store.addModel(object, glbFile);
      loadingStore.isDownload = true;
    });
  }

  return { loadingManager };
};
