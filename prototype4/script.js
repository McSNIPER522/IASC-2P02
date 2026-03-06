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

const sourceText = "The World of Taga By Gavin Foster Prompts: creation story/etiology In the beginning, there was a war. A war fought between Gods and Devils; the world was their battleground. The bloodshed waged on, shaping and molding the world of Taga as the battles went on indefinitely. As the end of the conflict seemed to be closing in on the Gods defeat, they had an idea, their last-ditch effort to come back from ruin. The Gods made humans. Humans were weak, stupid and didn't live long, but they were easy to make in numbers. The Gods threw them at the Devils in overwhelming numbers, driving the opposing side to near ruin. In the same desperation as the Gods, the Devils copied humans and made them with evil intent. Both sides continued to use their new soldiers until both sides started to branch off humans like they were templates, both sides started to make new humanoid races. The Gods made humanoids known as “divine races”, like Elves who live longer and require less necessities and Dwarves with skin as tough as stone. The Devils started making humanoids known as “hellish rases”, like Orcs whose savagery is as deadly as their strength and Goblins who possess great cunning and coordination that makes up for their small appearances. Both sides continued to make humanoid races to counter each new creation the other side makes, eventually they started making horrific abominations purely for death and destruction.The Gods and Devils fought and killed with their creations for hundreds of thousands of years. When one side began losing, they would create a new abomination to turn the tides. The war became nothing more then a massive bloodbath of monstrous creations. Eventually both sides get locked in a stalemate where no matter what they do, what they create, no side can be seen as a victor of this forever war. They come to an agreement that they will no longer fight and interfere on the battlefield while staying in their respected realms in hope that another conflict would not occur. Both sides began destroying their abominations of war, beings who are too dangerous to be left alone. These horrors of war looked nothing like their original predecessors, Humans..."
//this was part of a story I did for my final grade in a story telling class, i couldn't put it all in or else it wouldn't register.

let parsedText, tokenizedText

const tokenizedSourceText = ()=>
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

tokenizedSourceText()
findSearchTermInTokenizedText("gods", "white")
findSearchTermInTokenizedText("devils", "red")
findSearchTermInTokenizedText("humans", "black")

const clock = new THREE.Clock()

const animation=()=>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()