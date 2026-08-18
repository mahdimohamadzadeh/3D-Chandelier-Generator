<template>
  <div>
    <button class="btn" @click="first">first</button
    ><button @click="second" class="btn">second</button>
    <section id="hero" ref="container"></section>
  </div>
</template>

<script setup>
import { getDynamicUrl } from "@/helpers/imageUrl";
import { loadEncryptedGLB } from "@/composables/loadEncryptedGLB";
import {
  AmbientLight,
  DirectionalLight,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { ref, onMounted } from "vue";
import { useWindowSize } from "@vueuse/core";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene = new Scene();

const object = new Object3D();

const container = ref();

const { width, height } = useWindowSize();

let camera = new PerspectiveCamera(2, width.value / height.value, 0.1, 1000); // Create camera for object and set position
camera.position.z = 30;

let renderer = new WebGLRenderer({ antialias: true, alpha: true });

let controls;

const ambientLight = new AmbientLight(0xffffff, 0.5); // Ambient light
scene.add(ambientLight);

const upLight = new DirectionalLight(0xffffff, 100);
upLight.position.set(0, 1, 0);
scene.add(upLight);

const downLight = new DirectionalLight(0xffffff, 110);
downLight.position.set(0, -1, 0);
scene.add(downLight);

const modelURL = ref(null);

const first = () => {
  modelURL.value = null;
  modelURL.value = getDynamicUrl("500");
  init();
  console.log(modelURL.value);
};
const second = () => {
  modelURL.value = null;
  modelURL.value = getDynamicUrl("510");
  init();
  console.log(modelURL.value);
};
const init = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width.value, height.value / 2);

  if (modelURL.value !== null) {
    loadEncryptedGLB(modelURL.value, (glb) => {
      const model = glb.scene || glb.scenes[0];
      console.log(model);
      object.add(model);

      scene.add(object);

      model.position.set(Math.random() * 2, 0, 0);
      animate();
    });
  }

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;

  if (container.value && !container.value.contains(renderer.domElement)) {
    container.value.appendChild(renderer.domElement);
  }
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
