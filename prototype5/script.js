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
const drawCube = (height, color) =>
{
    const cubeMaterial = new THREE.MeshBasicMaterial( { color: new THREE.Color(color) } );
const cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.x=(Math.random()-0.5)*10
cube.position.z=(Math.random()-0.5)*10
cube.position.y = height -10
cube.rotation.x=Math.random()*2*Math.PI
cube.rotation.z=Math.random()*2*Math.PI
cube.rotation.y=Math.random()*2*Math.PI
scene.add(cube)
}

//drawCube(0, 'red')
//drawCube(1, 'blue')
//drawCube(2, 'yellow')
//drawCube(3, 'green')

const ui = new dat.GUI()

let preset = {};

const uiObj = {
	sourceText: 'The quick brown fox jumped over the lazy dog.',
    saveSourceText() {
		saveSourceText()
	},
    term1: 'fox',
    color1:'#aa00ff',
    term2: 'dog',
    color2:'#00ffaa',
    term3: '',
    color3:'',
    saveTerms(){
saveTerms()
    }

}

const saveSourceText=()=>
{
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()

    tokenizedSourceText(uiObj.sourceText)

}

const saveTerms=()=>
{
preset = ui.save()
visualizeFolder.hide()
findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)
}

const textFolder = ui.addFolder( 'Source Text' );

textFolder.add( uiObj, 'sourceText' ).name("Source Text")
textFolder.add( uiObj, 'saveSourceText' ).name("Save")

const termsFolder = ui.addFolder( 'Search Terms' );
const visualizeFolder = ui.addFolder( 'Visualize' );

termsFolder.add( uiObj, 'term1' ).name("Term 1")
termsFolder.addColor( uiObj, 'color1' ).name("Term 1 Color")

termsFolder.add( uiObj, 'term2' ).name("Term 2")
termsFolder.addColor( uiObj, 'color2' ).name("Term 2 Color")

termsFolder.add( uiObj, 'term3' ).name("Term 3")
termsFolder.addColor( uiObj, 'color3' ).name("Term 3 Color")

visualizeFolder.add(uiObj,'saveTerms').name("Visualize")


termsFolder.hide()
visualizeFolder.hide()


let parsedText, tokenizedText

const tokenizedSourceText = (sourceText)=>
{
parsedText=sourceText.replaceAll(".", "").toLowerCase()
tokenizedText = parsedText.split(/[^\w']+/)

}

const findSearchTermInTokenizedText = (term, color)=>
{
    for (let i = 0; i<tokenizedText.length; i++)
    {
        if(tokenizedText[i] == term){
            const height=(100 / tokenizedText.length)*i*0.2
            for(let a = 0; a<100;a++)
            {
            drawCube(height, color)
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

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()