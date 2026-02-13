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
scene.background = new THREE.Color('black')

const camera = new THREE.PerspectiveCamera(
75,
sizes.aspectRatio,
0.1,
100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const caveGeometry = new THREE.PlaneGeometry( 15.5, 7.5 );
const caveMaterial = new THREE.MeshStandardMaterial( { color: new THREE.Color('tan'), side: THREE.DoubleSide } );
const cave = new THREE.Mesh( caveGeometry, caveMaterial );
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow=true
scene.add( cave );


const smileGeometry = new THREE.TorusGeometry( 2, 0.2, 16, 100, Math.PI);
const smileMaterial = new THREE.MeshNormalMaterial( {} );
const smile = new THREE.Mesh( smileGeometry, smileMaterial );
smile.rotation.y = Math.PI * 0.5
smile.rotation.x = Math.PI
smile.position.set(6,0.5,0)
smile.castShadow=true
scene.add( smile );

const leftGeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
const leftMaterial = new THREE.MeshNormalMaterial( {} );
const leftEye = new THREE.Mesh( leftGeometry, leftMaterial )
leftEye.position.set(6,1,1);
leftEye.castShadow=true
scene.add( leftEye );

const rightGeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
const rightMaterial = new THREE.MeshNormalMaterial( {} );
const rightEye = new THREE.Mesh( rightGeometry, rightMaterial )
rightEye.position.set(6,1,-1);
rightEye.castShadow=true
scene.add( rightEye );

const directionalLight = new THREE.DirectionalLight( new THREE.Color ('white'), 0.5);
scene.add( directionalLight );
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow=true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

const helper = new THREE.DirectionalLightHelper( directionalLight );
//scene.add( helper );

const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
.add(directionalLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('Y')

lightPositionFolder
.add(directionalLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('Z')

const clock = new THREE.Clock()

const animation=()=>
{
    const elapsedTime = clock.getElapsedTime()

    helper.update()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()