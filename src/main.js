import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; 
import Stats from 'three/addons/libs/stats.module.js' // adds a FPS counter and other features
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; //lets you control without a mouse
// imported Terrain function from terrain.js
import { Terrain } from './terrain.js';

const gui = new GUI();

const scene = new THREE.Scene(); //the base
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); //sets up the camera

const renderer = new THREE.WebGLRenderer(); // three.js runs on webgl
const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const terrain = new Terrain(10, 10); //sets up a terrain of 10 by 10 from the function we imported earlier
scene.add(terrain);

const lamp = new THREE.DirectionalLight(0xFFFFFF, 2); // the lighting setup 
lamp.position.set(1, 2, 3);
scene.add(lamp);

const ambient = new THREE.AmbientLight(); // basic lighting for the whole workspace
ambient.intensity = 0.5; 
scene.add(ambient);

const stats = new Stats(); //adds the stats functionality we imported earlier
document.body.appendChild(stats.dom)


camera.position.z = 5;
controls.update();

// the main function that does the rendering of the terrain
function animate( time ) { 
    controls.update();
    stats.update();
    renderer.render( scene, camera );

}

// for better panning and control
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const terrianFolder = gui.addFolder('terrain');
terrianFolder.add(terrain, 'width', 1, 20 , 1).name('Width');
terrianFolder.add(terrain, 'height', 1, 20, 1).name('Height');
terrianFolder.addColor(terrain.material, 'color').name('Color');
terrianFolder.onChange (() => {
    terrain.createGeometry();
});