import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
let time = Date.now()
let camera, controls, scene, renderer, plantesMesh;

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
const sun = createPlanet(8, 22, 10, "yellow")
scene.add(sun)
sun.position.x = 0

//mercury
const mercury = createPlanet(2, 22, 10, "gray")
const psuMercury = new THREE.Object3D()
scene.add(psuMercury)
psuMercury.add(mercury)
mercury.position.x = 15

//venus
const venus = createPlanet(3, 22, 10, "orange")
const psuVenus = new THREE.Object3D()
scene.add(psuVenus)
psuVenus.add(venus)
venus.position.x = 35

//earth
const earth = createPlanet(3.8, 22, 10, "blue")
const psuEarth = new THREE.Object3D()
scene.add(psuEarth)
psuEarth.add(earth)
earth.position.x = 65


//moon
const moon = createPlanet(1.5, 22, 10, "purple")
earth.add(moon)
moon.position.x = 10

//mars
const mars = createPlanet(3,22,10, "red")
const psuMars = new THREE.Object3D()
scene.add(psuMars)
psuMars.add(mars)
mars.position.x = 105


camera.position.x = earth.position.x + 14
camera.position.y = earth.position.y + 2
camera.position.z = earth.position.z - 4



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

    
    //Window
    window.addEventListener('resize', windowResize)
    animate()
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
    earth.rotateY(0.002)
    psuMars.rotateY(0.0025)
    
    
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
