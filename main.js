import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

// Declarations
let earthOrbitRadius = 100,
    earthOrbitAngle = 0,
    earthOrbitSpeed = 0.5,
    
    moonOrbitRadius = 10,
    moonOrbitAngle = 0,
    moonOrbitSpeed = 4;

// THREE.JS COMMOM SETUP

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 3000 );
camera.position.set( 0, 0, 0 );

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Orbit controls
let controls = new OrbitControls(camera, renderer.domElement);


// Geometries
const planets = [];
let geometry, material;
let timestamp = 0;
let scaleVector = new THREE.Vector3();

const addPlanets = (sphX, posX, posY, posZ, texture, plan) => {
  geometry = new THREE.SphereGeometry(sphX, 100, 50);
  // geometry.scale(-2, 2, 2);
  material = new THREE.MeshBasicMaterial( {
    map: new THREE.TextureLoader().load( texture ),
  } );
  let mesh = new THREE.Mesh ( geometry, material )
  scene.add( mesh )
  scene.background = new THREE.Color(0x0000)
  mesh.position.set(posX, posY, posZ)
  planets.push(mesh)
  console.log(planets)
}

camera.position.set(0,100,200)
renderer.render( scene, camera )

addPlanets(50, 0, 0, 0, './image/8k_sun.jpg')
addPlanets(0.5, 40, 0, 0, './image/earthmap1k.jpg')

geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 10000; i++) {
  vertices.push(THREE.MathUtils.randFloatSpread(4000)); // x
  vertices.push(THREE.MathUtils.randFloatSpread(4000)); // y
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
  earthOrbitAngle += earthOrbitSpeed; 
  var radians = earthOrbitAngle * Math.PI / 180;

  planets[1].rotation.x += 0.01
  planets[1].position.x = Math.cos(radians) * earthOrbitRadius;
  planets[1].position.z = Math.sin(radians) * earthOrbitRadius;
  renderer.render(scene,camera);
}
animate()
