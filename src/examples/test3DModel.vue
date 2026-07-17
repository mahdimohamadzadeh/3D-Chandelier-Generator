<template>
  <div>
    <section id="hero" ref="container"></section>
  </div>
</template>

<script setup>
// import sartaj from "../assets/3D/luster-mehri/low1.glb?url";
// import toghe from "../assets/3D/luster-mehri/low2.glb?url";
import {
  AmbientLight,
  DirectionalLight,
  Euler,
  Object3D,
  PerspectiveCamera,
  Quaternion,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ref, onMounted, watch, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

const props = defineProps(["showTire"]);

const tireColor = ref("#cdeecc");

let scene = new Scene();

let dracoLoader = new DRACOLoader();

const sartajObject = new Object3D();
const togheObject = new Object3D();

const container = ref();

const { width, height } = useWindowSize();

let camera = new PerspectiveCamera(0.5, width.value / height.value, 0.1, 100);
camera.position.z = 40;
camera.position.y = 10;

let renderer = new WebGLRenderer({ antialias: true, alpha: true });

let sartajLoader = new GLTFLoader();
let togheLoader = new GLTFLoader();

let controls;

const directionalLight = new DirectionalLight(0xffffff, 50);
directionalLight.shadow = null;
scene.add(directionalLight);

const downLight = new DirectionalLight(0xffffff, 100);
directionalLight.position.set(0, -50, 0);
scene.add(downLight);

const init = () => {
  dracoLoader.setDecoderConfig({ type: "js" });
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  togheLoader.setDRACOLoader(dracoLoader);
  sartajLoader.setDRACOLoader(dracoLoader);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width.value / 2, height.value / 2);

  togheLoader.load(toghe, (glb) => {
    const model = glb.scene || glb.scenes[0];
    togheObject.add(model);

    scene.add(togheObject);

    renderer.render(scene, camera);
    animate();
  });

  sartajLoader.load(sartaj, (glb) => {
    const model = glb.scene || glb.scenes[0];
    sartajObject.add(model);

    // const rubberPad = model.getObjectByName("Object_6");
    // watch(tireColor, async (newColor) => {
    //   rubberPad.material.color.setStyle(newColor);
    // });

    // const quaternion = new Quaternion().setFromEuler(
    //   new Euler(0, Math.PI / 10, 0)
    // );
    // model.quaternion.copy(quaternion);
    // sartajObject.scale.set(0.3, 0.3, 0.3);
    model.position.set(-0.01, 0.05, 0);
  });

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 5;

  container.value.appendChild(renderer.domElement);
};

watch(
  () => props.showTire,
  (value) => {
    value ? scene.add(sartajObject) : scene.remove(sartajObject);
    console.log("Watch props.selected function called with args:", value);
  }
);

const animate = () => {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
};
onMounted(() => {
  init();
  animate();
});
</script>

<style scoped>
#hero {
  width: 100%;
  height: auto;
  margin-top: 100px;
  background-color: rgba(218, 218, 218, 0.904);
}
</style>
