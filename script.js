import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { shader } from 'three/examples/jsm/nodes/Nodes.js';
let camera, controls, scene, renderer;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

camera = new THREE.PerspectiveCamera(60, window.innerWidth /window.innerHeight, 0.1 , 1000)
camera.position.set(400,50,0)

//Controls
controls = new OrbitControls(camera, renderer.domElement)
controls.listenToKeyEvents(window)
controls.enableDamping = true
controls.dampingFactor = 0.05

controls.screenSpacePanning = false
controls.minDistance = 100
controls.maxDistance = 500

controls.maxPolarAngle = Math.PI / 2

//Objects

//earth
const Earfgeometry = new THREE.SphereGeometry(4,22,10)
const Earfmaterial = new THREE.MeshBasicMaterial({color:0x0000FF})
const shpereMesh = new THREE.Mesh(Earfgeometry,Earfmaterial)
scene.add(shpereMesh)

//stars
const geometry = new THREE.SphereGeometry(1,22,10)
const material = new THREE.MeshBasicMaterial({color:0xFFFFFF})

for ( let i = 0; i < 500; i ++ ) {

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.random() * 1600 - 800;
    mesh.position.y = Math.random() * 1600 - 800;
    mesh.position.z = Math.random() * 1600 - 800;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add( mesh );

}

//satALPH
const satGeo = new THREE.BoxGeometry(2,2,2)
const satMat = new THREE.MeshNormalMaterial({flatShading: true})
const satellite = new THREE.Mesh(satGeo, satMat)
scene.add(satellite)

tick();

function tick() {
    //lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3)
    dirLight1.position.set(1,1,1)
    scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0x002288, 3)
    dirLight2.position.set(-1,-1,-1)
    scene.add(dirLight2)

    const ambientLight = new THREE.AmbientLight(0x555555)
    scene.add(ambientLight)

    //Window
    window.addEventListener('resize', windowResize)
}

function windowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    //time tracking
    // const clock = new THREE.Clock()
    // const delta = clock.getDelta()
    // const elapsed = clock.elapsedTime

    // //earth Pos
    // shpereMesh.position.x = Math.sin(elapsed/2) * 3
    // shpereMesh.position.z = Math.cos(elapsed/2) * 3
    controls.update()

    render()
}

// function animate()
// {
//     //time tracking
//     var delta = clock.getDelta();
//     var elapsed = clock.elapsedTime;
    
//     //sphere position
//     sphere.position.x = Math.sin(elapsed/2) * 3;
//     sphere.position.z = Math.cos(elapsed/2) * 3;
    
//     //satellite
//     satellite.position.x =  sphere.position.x + Math.sin(elapsed*2) * 2;
//     satellite.position.z = sphere.position.z + Math.cos(elapsed*2) * 2;
//     satellite.rotation.x += 0.4 * delta;
//     satellite.rotation.y += 0.2 * delta;
    
//     requestAnimationFrame( animate );
//     controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
//     renderer.render( scene, camera );
//}
function render() {
    renderer.render(scene,camera)
}
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// // Object
// const geometry = new THREE.SphereGeometry(4, 22, 10)
// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // Sizes
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 15
// scene.add(camera)

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)

// // //Reference Time
// // let time = Date.now()

// //Clock
// // const clock = new THREE.Clock()

// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
// gsap.to(mesh.position, { duration: 1, delay: 2, x: -2 })

// //Animations
// const tick = () =>
// {
//     // //Time
//     // const currentTime = Date.now()
//     // const deltaTime = currentTime - time
//     // time = currentTime
//     // console.log(deltaTime)

//     // //Clock
//     // const elapsedTime = clock.getElapsedTime()
//     // console.log(elapsedTime)
//     // //Update Objects
//     // camera.position.x = Math.sin(elapsedTime)
//     // camera.position.y = Math.cos(elapsedTime)
//     // camera.lookAt(mesh.position)


//     //Render
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(tick)
//     sizes = {
//         width: window.innerWidth,
//         height: window.innerHeight
//     }
//     renderer.setSize(sizes.width,sizes.height)
// }
// tick()