import * as THREE from "three";
import createCamera from "./world/camera.js";
import createScene from "./world/scene.js";
import createCube from "./world/objects/cube.js";

const canvas = document.querySelector("canvas.webgl");

const scene = createScene();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const group = new THREE.Group();
scene.add(group);

const cube1 = createCube();
group.add(cube1);

const cube2 = createCube();
cube2.position.x = 2;
cube2.material.color = new THREE.Color(0xff0000);
group.add(cube2);

const cube3 = createCube();
cube3.position.x = -2;
cube3.material.color = new THREE.Color(0x0000ff);
group.add(cube3);



const camera = createCamera();
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
    canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

function animate() {
    requestAnimationFrame(animate);
    cube1.rotateY(0.04);
    group.rotateX(0.01);
    renderer.render(scene, camera);
}
animate();
