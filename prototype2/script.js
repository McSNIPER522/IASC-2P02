import * as THREE from "three";
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}


const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')

const camera = new THREE.PerspectiveCamera(
75,
sizes.aspectRatio,
0.1,
100
)
scene.add(camera)
camera.position.set(-2, 3, 5)
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias:true
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshNormalMaterial();
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(testSphere);

const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI *0.5
scene.add(plane);

const ui = new dat.GUI()

const uiObject={
    speed:1,
    distance:1 
}

const sphereFolder= ui.addFolder('Sphere')
sphereFolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    sphereFolder
    .add(uiObject, 'distance')
    .min(0.1)
    .max(10)
    .step(0.1)
sphereFolder
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(1)
sphereFolder
.add(testSphere.position, 'x')
 .min(-5)
    .max(5)
    .step(1)
sphereFolder
.add(testSphere.position, 'z')
 .min(-5)
    .max(5)
    .step(1)

const planeFolder= ui.addFolder('Plane')

planeFolder.add(planeMaterial, 'wireframe')

const clock = new THREE.Clock()

const animation=()=>
{
    const elapsedTime = clock.getElapsedTime()

    testSphere.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.distance

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()