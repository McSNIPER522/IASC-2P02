import * as THREE from "three";

const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()
scene.background = new THREE.Color('grey')

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
100
)
scene.add(camera)
camera.position.set(0, 0, 5)
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias:true
})
renderer.setSize(window.innerWidth, window.innerHeight)

const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshNormalMaterial();
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(testSphere);



const clock = new THREE.Clock()

const animation=()=>
{
    const elapsedTime = clock.getElapsedTime()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()