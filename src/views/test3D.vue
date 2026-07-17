<template>
  <div>
    <button class="btn" @click="first">first</button
    ><button @click="second" class="btn">second</button>
    <section id="hero" ref="container"></section>
  </div>
</template>

<script setup>
import luster1 from "../assets/3D/500.glb?url";
import luster2 from "../assets/3D/510.glb?url";

import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ref, onMounted, watch, computed } from "vue";
import { useWindowSize } from "@vueuse/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

let scene = new Scene();

let dracoLoader = new DRACOLoader();

const object = new Object3D();

const container = ref();

const { width, height } = useWindowSize();

let camera = new PerspectiveCamera(2, width.value / height.value, 0.1, 1000); // Create camera for object and set position
camera.position.z = 30;

let renderer = new WebGLRenderer({ antialias: true, alpha: true });

let loader = new GLTFLoader();

let controls;

// const light = new AmbientLight(0x404040, 10000);
// scene.add(light);

const ambientLight = new AmbientLight(0xffffff, 0.5); // Ambient light
scene.add(ambientLight);

const upLight = new DirectionalLight(0xffffff, 100);
upLight.position.set(0, 1, 0);
scene.add(upLight);

const downLight = new DirectionalLight(0xffffff, 110);
downLight.position.set(0, -1, 0);
scene.add(downLight);

// const rightLight = new DirectionalLight(0xffffff, 50);
// downLight.position.set(1, 0, 0);
// scene.add(rightLight);

// const leftLight = new DirectionalLight(0xffffff, 50);
// downLight.position.set(-1, 0, 0);
// scene.add(leftLight);

const modelURL = ref(null);

const first = () => {
  modelURL.value = null;
  modelURL.value = luster1;
  init();
  console.log(modelURL.value);
};
const second = () => {
  modelURL.value = null;
  modelURL.value = luster2;
  init();
  console.log(modelURL.value);
};
const init = () => {
  dracoLoader.setDecoderConfig({ type: "js" });
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  loader.setDRACOLoader(dracoLoader);

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width.value, height.value / 2);

  if (modelURL.value !== null) {
    loader.load(modelURL.value, (glb) => {
      const model = glb.scene || glb.scenes[0];
      console.log(model);
      object.add(model);

      scene.add(object);

      // const positionX = 50 / 100;
      // const positionY = 0 / 100;
      // const positionZ = 0 / 100;

      model.position.set(Math.random() * 2, positionY, positionZ);
      animate();
    });
  }

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 5;

  container.value.appendChild(renderer.domElement);
};

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
}
</style>
