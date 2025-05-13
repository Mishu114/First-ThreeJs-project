import * as THREE from "three";

export default function createScene() {
    const scene = new THREE.Scene();
  
    // Optional: set a background color or texture
    scene.background = new THREE.Color(0x202020); // dark gray background
  
    // Optional: add fog
    // scene.fog = new THREE.Fog(0x202020, 10, 50);
  
    return scene;
  }