import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js';

// Declarations
let earthOrbitRadius = 2500,
    OrbitAngle = 0,
    OrbitSpeed = 0.5,
    
    moonOrbitRadius = 10,
    moonOrbitAngle = 0,
    moonOrbitSpeed = 4;

let mercuryOrbitRadius = 1000;

// THREE.JS COMMOM SETUP

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, innerWidth / innerHeight, 0.1, 60000 );
// camera.position.set( 0, 0, 0 );

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

const addPlanets = (sphX, posX, posY, posZ, texture) => {
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

camera.position.set(0,400,3500)
renderer.render( scene, camera )

addPlanets(595, 0, 0, 0, './image/8k_sun.jpg')
addPlanets(5, 0, 0, 0, './image/earthmap1k.jpg')
addPlanets(2.5, 0, 0, 0, './image/mercury.jpg')

geometry = new THREE.SphereGeometry(15000,100,50);
geometry.scale(-2, 2, 2);

material = new THREE.MeshBasicMaterial( {
  map: new THREE.TextureLoader().load( './image/galaxy.jpg' )
} );
const cube = new THREE.Mesh ( geometry, material )
scene.add( cube )
scene.background = new THREE.Color(0x0000)

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
  OrbitAngle += OrbitSpeed; 
  let earthRadians = OrbitAngle * Math.PI / 365;
  let mercuryRadians = OrbitAngle * Math.PI / 88;

  planets[0].rotation.x += 0.0002;
  planets[0].rotation.y += 0.0002;
  planets[1].rotation.x += 0.01;
  planets[1].position.x = Math.cos(earthRadians) * earthOrbitRadius;
  planets[1].position.z = Math.sin(earthRadians) * earthOrbitRadius;
  planets[2].position.z = Math.sin(mercuryRadians) * mercuryOrbitRadius;
  planets[2].position.x = Math.cos(mercuryRadians) * mercuryOrbitRadius;
  renderer.render(scene,camera);
}
animate()
