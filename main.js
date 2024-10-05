import * as THREE from 'three';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

//sphere 
const geometry = new THREE.SphereGeometry();
const material = new THREE.MeshBasicMaterial({flatShading: false, color: 0x00ff00});
const sphere = new THREE.Mesh(geometry, material);
scene.add(camera);
scene.add(sphere);

//satelite
const geometry_satelite = new THREE.BoxGeometry(0.4, 0.4, 0.4);
const material_satelite = new THREE.MeshBasicMaterial({color: 0x00ff00, flatShading: true});
satelite = new THREE.Mesh(geometry_satelite, material_satelite);
scene.add(satelite);

camera.position.z = 5;


function animate(){

    var delta = clock.getDelta();
    var elapsed = clock.getElapsedTime();

    //spehere position
    sphere.rotation.x += 0.01;
    sphere.rotation.z += 0.01;

    //satelite position
    satelite.position.x = sphere.position.x + Math.sin(elapsed*2) * 2;
    satelite.position.z = sphere.position.z + Math.cos(elapsed*2) * 2;
    satelite.rotation.x += 0.4 * delta;
    satelite.rotation.y += 0.2 * delta;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


