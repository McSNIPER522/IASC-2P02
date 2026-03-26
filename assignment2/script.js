import * as THREE from "three";
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

window.addEventListener('resize', ()=>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 12, -20)
const renderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias:true
})
renderer.setSize(sizes.width, sizes.height)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const directionalLight = new THREE.DirectionalLight( 0x404040, 100 );
scene.add( directionalLight );


const cubeGeometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
const drawCube = (height, params) =>
{
    const cubeMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color(params.color) } );
sizes.height
sizes.width
    const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.x=(Math.random()-0.5)*10
cube.position.z=(Math.random()-0.5)*10
cube.position.y = height -10
cube.rotation.x=Math.random()*2*Math.PI
cube.rotation.z=Math.random()*2*Math.PI
cube.rotation.y=Math.random()*2*Math.PI


params.group.add(cube)
}




const ui = new dat.GUI()

let preset = {};

const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

const uiObj = {
	sourceText: '',
    saveSourceText() {
		saveSourceText()
	},
    term1:{
term: '',
    color:'',
    group: group1,
    nCubes:100
    },
    term2:{
        term: '',
    color:'',
    group: group2,
    nCubes:100
    },
    term3:{
        term: '',
        group: group3,
    color:'',
    nCubes:100
},
    
    saveTerms(){
saveTerms()
    },
rotateCamera: false
}

const saveSourceText=()=>
{
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()
    cameraFolder.show()

    tokenizedSourceText(uiObj.sourceText)

}

const saveTerms=()=>
{
preset = ui.save()
visualizeFolder.hide()
findSearchTermInTokenizedText(uiObj.term1)
findSearchTermInTokenizedText(uiObj.term2)
findSearchTermInTokenizedText(uiObj.term3)
}

const textFolder = ui.addFolder( 'Source Text' );

textFolder.add( uiObj, 'sourceText' ).name("Source Text")
textFolder.add( uiObj, 'saveSourceText' ).name("Save")

const termsFolder = ui.addFolder( 'Search Terms' );
const cameraFolder = ui.addFolder("Camera");
const visualizeFolder = ui.addFolder( 'Visualize' );



termsFolder.add( uiObj.term1, 'term' ).name("Term 1")
termsFolder.add(group1, 'visible').name("Term 1 Visibility")
termsFolder.addColor( uiObj.term1, 'color' ).name("Term 1 Color")

termsFolder.add( uiObj.term2, 'term' ).name("Term 2")
termsFolder.add(group2, 'visible').name("Term 2 Visibility")
termsFolder.addColor( uiObj.term2, 'color' ).name("Term 2 Color")

termsFolder.add( uiObj.term3, 'term' ).name("Term 3")
termsFolder.add(group3, 'visible').name("Term 3 Visibility")
termsFolder.addColor( uiObj.term3, 'color' ).name("Term 3 Color")

visualizeFolder.add(uiObj,'saveTerms').name("Visualize")

cameraFolder.add(uiObj, 'rotateCamera').name("Turntable")

termsFolder.hide()
visualizeFolder.hide()
cameraFolder.hide()

let parsedText, tokenizedText

const tokenizedSourceText = (sourceText)=>
{
parsedText=sourceText.replaceAll(".", "").toLowerCase()
tokenizedText = parsedText.split(/[^\w']+/)

}

const findSearchTermInTokenizedText = (params)=>
{
    for (let i = 0; i<tokenizedText.length; i++)
    {
        if(tokenizedText[i] === params.term){
            const height=(100 / tokenizedText.length)*i*0.2
            for(let a = 0; a<params.nCubes;a++)
            {
            drawCube(height, params)
            }
        }
    }
}

//tokenizedSourceText("")
//findSearchTermInTokenizedText("gods", "white")
//findSearchTermInTokenizedText("devils", "red")
//findSearchTermInTokenizedText("humans", "black")

const clock = new THREE.Clock()

const animation=()=>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    if(uiObj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.1)*20
        camera.position.z = Math.cos(elapsedTime * 0.1)*20
        camera.position.y = 5
        camera.lookAt(0,0,0)
    }

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()