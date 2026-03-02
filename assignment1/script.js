import * as THREE from "three";
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}


const canvas = document.querySelector('.webgl')

const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')

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
antialias:true,
alpha: true
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




const ballGeometry = new THREE.SphereGeometry( 0.5, 32, 16 );
const ballMaterial = new THREE.MeshNormalMaterial( {} );
const ball = new THREE.Mesh( ballGeometry, ballMaterial )
ball.position.set(6,1,-15);
ball.castShadow=true
scene.add( ball );

const personGeometry = new THREE.SphereGeometry( 2.25, 6, 32 );
const personMaterial = new THREE.MeshNormalMaterial( {} );
const person = new THREE.Mesh( personGeometry, personMaterial )
person.position.set(7,-0.75,-15);

person.castShadow=true
scene.add( person );

const directionalLight = new THREE.DirectionalLight( new THREE.Color ('white'), 0.5);
scene.add( directionalLight );
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow=true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

const helper = new THREE.DirectionalLightHelper( directionalLight );
//scene.add( helper );

const domObject = {
    part: 1,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    fourthtChange: false
    
}

document.querySelector('#part-one').onclick=function(){
domObject.part=1,
domObject.firstChange = false,
   domObject.secondChange = false,
   domObject.thirdChange = false,
   domObject.fourthChange = false,
   person.position.set(7,-0.75,-15);
   ball.position.set(6,1,-15);
}
document.querySelector('#part-two').onclick=function(){
    domObject.part=2,
    domObject.firstChange = false,
   domObject.secondChange = false,
   domObject.thirdChange = false,
   domObject.fourthChange = false,
   person.position.set(7,-0.75,-15);
   ball.position.set(6,1,-15);
}
document.querySelector('#first-change').onclick=function(){
   domObject.firstChange = true,
   domObject.secondChange = false,
   domObject.thirdChange = false,
   domObject.fourthChange = false,
   person.position.set(7,-0.75,-15);
   
}
document.querySelector('#second-change').onclick=function(){
    domObject.secondChange = true,
    domObject.firstChange=false,
    domObject.thirdChange = false,
    domObject.fourthChange = false,
    ball.position.set(6,1,-15);
}
document.querySelector('#third-change').onclick=function(){
    domObject.thirdChange = true
    domObject.firstChange=false,
    domObject.secondChange = false,
    domObject.fourthChange = false,
    person.position.set(7,-0.75,-15);
   
}
document.querySelector('#fourth-change').onclick=function(){
    domObject.fourthChange = true,
    domObject.firstChange=false,
    domObject.secondChange = false,
    domObject.thirdChange = false,
    ball.position.set(6,1,-15);
}



/*
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
*/

const clock = new THREE.Clock()

const animation=()=>
{
    const elapsedTime = clock.getElapsedTime()

    if(domObject.part === 1){
camera.position.set(6,0,0)
camera.lookAt(0,0,0)
    }
    if(domObject.part === 2){
camera.position.set(25,1,0)
camera.lookAt(0,0,0)
//ball.position.set(30,1,-6);
    }
    if(domObject.firstChange){
        ball.position.z=(Math.sin(elapsedTime))*4

    }
    if(domObject.secondChange){
person.position.z=(Math.sin(elapsedTime))*5
    }
    if(domObject.thirdChange){
ball.position.z=(Math.sin(elapsedTime))*8
    }
    if(domObject.fourthChange){
person.position.z=(Math.sin(elapsedTime))*5
    }

    helper.update()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()