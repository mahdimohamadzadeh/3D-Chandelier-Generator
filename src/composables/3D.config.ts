import {
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  TOUCH,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { unref } from "vue";
import type { Ref } from "vue";

export interface ThreeJSContext {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  updateSize: () => void;
}

let animationId: number | null = null;
export const useThreeJS = (
  element: HTMLElement | Ref<HTMLElement | undefined>,
  width: number,
  height: number
): ThreeJSContext => {

  if (animationId !== null) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  const el = unref(element);
  const initialWidth = el?.clientWidth || width || window.innerWidth;
  const initialHeight = el?.clientHeight || height || window.innerHeight;

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
  camera.position.set(0, 0, 50);

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(initialWidth, initialHeight, false);

  scene.add(new AmbientLight(0xffffff, 200));

  const upLight = new DirectionalLight(0xffffff, 100);
  upLight.position.set(0, 1, 0).normalize();
  scene.add(upLight);

  const downLight = new DirectionalLight(0xffffff, 100);
  downLight.position.set(0, -1, 0);
  scene.add(downLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  renderer.domElement.style.touchAction = "none";

  if (el) {
    while (el.firstChild) el.removeChild(el.firstChild);
    el.appendChild(renderer.domElement);
  }

  const updateSize = () => {
    const targetEl = unref(element);
    if (!targetEl) return;
    const w = targetEl.clientWidth || window.innerWidth;
    const h = targetEl.clientHeight || window.innerHeight;
    if (w <= 0 || h <= 0) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };

  if (typeof ResizeObserver !== "undefined" && el) {
    const resizeObserver = new ResizeObserver(() => updateSize());
    resizeObserver.observe(el);
  }
  window.addEventListener("resize", updateSize);

  const animate = () => {
    renderer.render(scene, camera);
    controls.update();
    animationId = requestAnimationFrame(animate);
  };

  animate();
  setTimeout(updateSize, 50);

  return { scene, renderer, camera, updateSize };
};