import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");
// Textures
// 1st Method (Not Good)
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// };
// image.src = "/textures/1197094.jpg";
// 2nd Method (Good)
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager); // it can load multiple images
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onProgress = () => {
  console.log("loading progress");
};
loadingManager.onLoad = () => {
  console.log("loaded");
};
loadingManager.onError = () => {
  console.log("error");
};
const texture = textureLoader.load("/textures/minecraft.png");
texture.repeat.x = 2;
texture.repeat.y = 3;
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.offset.x = 0.5;
texture.offset.y = 0.5;
texture.rotation = Math.PI / 4;
texture.generateMipmaps = false; // for better performance (for nearest filter)
texture.minFilter = THREE.NearestFilter; // for nearest filter
texture.magFilter = THREE.NearestFilter; // for nearest filter
// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
console.log(geometry.attributes);
const material = new THREE.MeshBasicMaterial({ map: texture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
