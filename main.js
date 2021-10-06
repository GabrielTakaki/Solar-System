import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

// THREE.JS COMMOM SETUP

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 3000 );

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Orbit controls
let controls = new OrbitControls(camera, renderer.domElement);


// Geometries
let geometry = new THREE.SphereGeometry(1,100,50);
geometry.scale(-2, 2, 2);

let material = new THREE.MeshBasicMaterial( {
  map: new THREE.TextureLoader().load( './image/earthmap1k.jpg' ),
  specularMap: new THREE.TextureLoader().load( './images/earthspec1k.jpg' ),
  specular: new THREE.Color('gray')
} );
const cube = new THREE.Mesh ( geometry, material )
scene.add( cube )
scene.background = new THREE.Color(0x0000)
renderer.render( scene, camera )
camera.position.z = 15

geometry = new THREE.SphereGeometry( 0.370, 100, 100 )
material = new THREE.MeshBasicMaterial( {
  map: new THREE.TextureLoader().load( './image/2k_moon.jpg' ),
} );
const meshMoon = new THREE.Mesh ( geometry, material )
meshMoon.position.set(10, 0, 0)
scene.add( meshMoon )

geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 6000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
  vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
}
geometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(vertices, 3)
);
let particles = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({ color: 0x888888 })
);
scene.add(particles);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);

// Back Light
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(0, 0, -1);
scene.add(backLight);

// MAKE CAMERA RESPOSIVE
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
  camera.aspect = innerWidth / innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(innerWidth, innerHeight);
}

const animate = () => {
  requestAnimationFrame( animate );
  controls.update();
  cube.rotation.y += 0.005;
  cube.rotation.x += 0.001;
  meshMoon.rotation.x += 0.0001
  scene.rotation.y -= 0.003;
  renderer.render(scene,camera);
}
animate()
