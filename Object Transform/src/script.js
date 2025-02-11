import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.y = 1;
// mesh.position.x = 0.5;
// mesh.position.z = -3.5;
mesh.position.set(1, -1, -1);
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;
mesh.scale.set(2, 0.5, 0.5);
//Rotation
mesh.rotation.reorder("YXZ");
mesh.rotation.x = 1;
mesh.rotation.y = Math.PI * 0.25;
scene.add(mesh);
// mesh.position.normalize(); // normalizes the vector to 1
// console.log(mesh.position.length());

//Axes helper
const axeshelper = new THREE.AxesHelper();
scene.add(axeshelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;
camera.position.set(1, 1, 4);
camera.lookAt(mesh.position);
scene.add(camera);

//Groups
const group = new THREE.Group();
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ffff })
);
cube2.position.x = 2;
// group.add(mesh);
group.add(cube1);
group.add(cube2);
group.position.set(1, -2, 0);
scene.add(group);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
