import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { unref } from "vue";
import type { Ref } from "vue";

export interface ThreeJSContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
}

export const useThreeJS = (
  element: HTMLElement | Ref<HTMLElement | undefined>,
  width: number,
  height: number
): ThreeJSContext => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.set(0, 0, 50);

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  scene.add(new AmbientLight(0xffffff, 200));

  const upLight = new DirectionalLight(0xffffff, 100);
  upLight.position.set(0, 1, 0).normalize();
  scene.add(upLight);

  const downLight = new DirectionalLight(0xffffff, 100);
  downLight.position.set(0, -1, 0);
  scene.add(downLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = true;
  controls.enableZoom = true;

  const el = unref(element);
  if (el) {
    // remove any existing canvas to prevent duplicate scenes
    while (el.firstChild) el.removeChild(el.firstChild);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    el.appendChild(renderer.domElement);
  }

  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    requestAnimationFrame(animate);
  };
  animate();

  return { scene, renderer, camera };
};
