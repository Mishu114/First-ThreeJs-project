import * as THREE from "three";
import createCamera from "./world/camera.js";
import createScene from "./world/scene.js";
import createCube from "./world/objects/cube.js";
import gsap from "gsap";

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

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(sphere);
sphere.position.y = -2;
//gsap.to(sphere.position, { y: 3, duration: 1,  yoyo: true, repeat: -1 });
gsap.to(sphere.position, {
    x: 4,
    y: 4,
    duration: 2,
    repeat: -1,
    yoyo: true,
    modifiers: {
        x: gsap.utils.unitize(value => 4 * Math.cos(Date.now() * 0.002)),
        y: gsap.utils.unitize(value => 4 * Math.sin(Date.now() * 0.002))
    }
});


function animate() {
    requestAnimationFrame(animate);
    //group.rotateX(0.04);
    group.position.y = Math.sin(Date.now() * 0.002);
    renderer.render(scene, camera);
}

let time = Date.now();
function cubeRotate() {
    const delta = Date.now() - time;
    time = Date.now();
    requestAnimationFrame(cubeRotate);
    cube1.rotateY(0.004*delta);
    cube2.rotateY(-0.004*delta);
    cube3.rotateY(-0.004*delta);
}
animate();
cubeRotate();


