import * as THREE from './example/three.js'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
let time = Date.now()
let camera, controls, scene, renderer, plantesMesh;
var raycaster = new THREE.Raycaster(); // create once
var mouse = new THREE.Vector2(); // create once

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

camera = new THREE.PerspectiveCamera(60, window.innerWidth /window.innerHeight, 1 , 10000)


//Controls
controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(window)
controls.enableDamping = true
controls.dampingFactor = 0.05
controls.screenSpacePanning = false
controls.minDistance = 1
controls.maxDistance = 500
controls.maxPolarAngle = Math.PI / 2

//Objects
//sun
const pointLight = new THREE.PointLight(0xffffff, 2, 5000)
scene.add(pointLight)
const sun = createPlanet(50, 100, 100, "yellow")
scene.add(sun)
sun.position.x = 0

//mercury
const mercury = createPlanet(2, 22, 10, "gray")
const psuMercury = new THREE.Object3D()
scene.add(psuMercury)
psuMercury.add(mercury)
mercury.position.x = 115

//venus
const venus = createPlanet(7, 22, 10, "orange")
const psuVenus = new THREE.Object3D()
scene.add(psuVenus)
psuVenus.add(venus)
venus.position.x = 135

//earth
const earth = createPlanet(4, 22, 10, "blue")
const psuEarth = new THREE.Object3D()
scene.add(psuEarth)
psuEarth.add(earth)
earth.position.x = 165


//moon
const moon = createPlanet(1.5, 22, 10, "purple")
earth.add(moon)
moon.position.x = 10

//mars
const mars = createPlanet(3,22,10, "red")
const psuMars = new THREE.Object3D()
scene.add(psuMars)
psuMars.add(mars)
mars.position.x = 305

//jupiter
const jupiter = createPlanet(15,22,10, "rgba(109,53,24,255)")
const psuJupiter = new THREE.Object3D()
scene.add(psuJupiter)
psuJupiter.add(jupiter)
jupiter.position.x = 360

//saturn
const saturn = createPlanet(12.5,22,10, "rgba(211,181,143,255)")
const psuSaturn = new THREE.Object3D()
scene.add(psuSaturn)
psuSaturn.add(saturn)
saturn.position.x = 520

//uranus
const uranus = createPlanet(10,22,10, "rgba(155,182,193,255)")
const psuUranus = new THREE.Object3D()
scene.add(psuUranus)
psuUranus.add(uranus)
uranus.position.x = 580

//neptune
const neptune = createPlanet(7,22,10, "rgba(102,126,188,255)")
const psuNeptune = new THREE.Object3D()
scene.add(psuNeptune)
psuNeptune.add(neptune)
neptune.position.x = 620



camera.position.x = earth.position.x + 814
camera.position.y = earth.position.y + 802
camera.position.z = earth.position.z + 804



//stars
const geometry = new THREE.SphereGeometry(1,22,10)
const material = new THREE.MeshBasicMaterial({color:0xFFFFFF})

for ( let i = 0; i < 5000; i ++ ) {
    
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.random() * 7000 - 3000
    mesh.position.y = Math.random() * 7000 - 3000
    mesh.position.z = Math.random() * 7000 - 3000
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add( mesh );
    
}


tick();

function tick() {
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    document.body.appendChild(renderer.domElement)
    // mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

    // raycaster.setFromCamera( mouse, camera );

    // var intersects = raycaster.intersectObjects( objects, recursiveFlag );

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false); 
    onDocumentMouseDown()
    //Window
    window.addEventListener('resize', windowResize)
    animate()
}

function onDocumentMouseDown(event) {

    event.preventDefault();

    mouseYOnMouseDown = event.clientY - windowHalfY;
    mouseXOnMouseDown = event.clientX - windowHalfX;

    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    vector = vector.unproject(camera);

    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
    var intersects = raycaster.intersectObjects(circleObj, true); // Circle element which you want to identify

    if (intersects.length > 0) {
        alert("Mouse on Circle");
    }

}

function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {


    sun.rotateY(0.001)
    psuMercury.rotateY(0.01)
    psuVenus.rotateY(0.005)
    psuEarth.rotateY(0.003)
    psuJupiter.rotateY(0.0005)
    earth.rotateY(0.03)
    psuMars.rotateY(0.0025)
    psuSaturn.rotateY(0.002)
    psuUranus.rotateY(0.0015)
    psuNeptune.rotateY(0.001)
    
    
    controls.update()
    render()
}

function render() {
    renderer.render(scene,camera)
}
function createPlanet(geo0, geo1, geo2, color){
    let geo, mat
    geo = new THREE.SphereGeometry(geo0,geo1,geo2)
    mat = new THREE.MeshBasicMaterial({color: color})
    const meh = new THREE.Mesh(geo,mat)

    return meh
    
}
