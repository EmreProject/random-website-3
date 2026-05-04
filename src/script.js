import * as THREE from 'three'
import {AnimatedModelToParticle} from "./ModelToParticle.js"
import {Particles} from "./particles.js"
import { RayCaster } from './mousePicking.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

//https://www.meisken.dev/
//https://nfinitepaper.com/#technology
//https://astrarise.vercel.app/
//https://www.meisken.dev/
//https://epiminds.com/
//https://zuncreative.com/
//https://www.unitedsolutionsltd.com/
//https://www.ruxin34.com/shop



let renderScene;
let orthoCamera,perspectiveCamera;


//Texture Loadr
const textureLoader=new THREE.TextureLoader();
const flameTexture=textureLoader.load("./textures/flame_02.png");



/**
 * Base
 */


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
 renderScene=new THREE.Scene();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(2,2)

//Oamera
orthoCamera = new THREE.OrthographicCamera( - 100, 100, 100, - 100, 0, 100 );
orthoCamera.position.z=-1;
orthoCamera.lookAt(new THREE.Vector3(0,0,0));

perspectiveCamera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 50 );
perspectiveCamera.position.z = -3;
perspectiveCamera.lookAt(new THREE.Vector3(0,0,0));



window.addEventListener('resize', () =>
{

    // Update camera
    perspectiveCamera.aspect = window.innerWidth/ window.innerHeight
    perspectiveCamera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(window.innerWidth,window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
 renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const modelLocation="./models/imperial/scene.gltf";


let modelToParticle, particles;


const starwarsParameters={
    subdivision:3,
    startScale:0.1,
    startPosition:new THREE.Vector3(-1,-1,-0.6),
    startRotation:new THREE.Vector3(0,Math.PI /1.3,0),
    textureSize:0,
    particleSize:1,
    cloneParticle:1,
    particleTexture:flameTexture,   
    startFloorScale:30,
    startFloorPosition:new THREE.Vector3(0,-5,0),
    startFloorRotation:new THREE.Vector3(-Math.PI / 2,0,0),
    uMinStartVelocity:Particles.PixelToNdc(5),
    uMaxStartVelocity:Particles.PixelToNdc(10),
    uStartVelocityDirection:new THREE.Vector3(1,1,0).normalize(),
    uMaxForce:Particles.PixelToNdc(4),
    uMaxVelocity:Particles.PixelToNdc(50),
    uLimitDistance:Particles.PixelToNdc(100),


    uFlowFieldDimension:10,
    uEachFlowFieldSquareDimension: 0.2,
    uRandomForceRatio:0.2, 
    uRandomForceParticleRatio:0.2,
    uMagicOrbitForceRatio:4,

    uMouseRayRadius:0.35,
    uMouseRayForce:0.1

}


function ResizeModel(){
    //default
    const modelSize={
        scale:0.07,
        position:new THREE.Vector3(-0.65,-0.7,-0.6),
        rotationY:Math.PI/1.35,
        maxForce:Particles.PixelToNdc(8),
        maxVelocity:Particles.PixelToNdc(70),
        limitDistance:Particles.PixelToNdc(100),
        mouseRayRadius:0.25,
        mouseRayForce:0.1
    }

    /*
    uMaxForce:Particles.PixelToNdc(4),
    uMaxVelocity:Particles.PixelToNdc(50),
    */

    if(window.innerWidth<400){

        modelSize.scale=0.07
        modelSize.position.x=-0.5
        modelSize.position.y=-0.5
        starwarsParameters.startFloorScale=10
    }
    if(window.innerWidth>=400 && window.innerWidth<600){

        modelSize.scale=0.08
        modelSize.position.x=-0.85
        modelSize.position.y=-0.8

        if(window.innerWidth>520){
             modelSize.scale=0.085
        }

         starwarsParameters.startFloorScale=15
        
    }
    if(window.innerWidth>=600 && window.innerWidth<950){

        modelSize.scale=0.1
        modelSize.position.x=-1.2
        modelSize.position.y=-1.1
        modelSize.rotationY=Math.PI/2
        starwarsParameters.startFloorScale=20
        modelSize.maxForce=Particles.PixelToNdc(7)
        modelSize.maxVelocity=Particles.PixelToNdc(90)
        
    }
    if(window.innerWidth>=950 && window.innerWidth<1500 ){

        modelSize.scale=0.12
        modelSize.position.x=-1.5
        modelSize.position.y=-1.3
        modelSize.rotationY=Math.PI/2
        starwarsParameters.startFloorScale=55
        modelSize.maxForce=Particles.PixelToNdc(15)
        modelSize.maxVelocity=Particles.PixelToNdc(140)
        modelSize.mouseRayForce=0.2;
        modelSize.mouseRayRadius=1
         modelSize.limitDistance=Particles.PixelToNdc(200)
    }

     if(window.innerWidth>=1500 ){

       
        modelSize.scale=0.13
        modelSize.position.x=-1.7
        modelSize.position.y=-1.5
        modelSize.rotationY=Math.PI/2
        starwarsParameters.startFloorScale=55
        modelSize.maxForce=Particles.PixelToNdc(20)
        modelSize.maxVelocity=Particles.PixelToNdc(140)
        modelSize.mouseRayForce=0.2;
        modelSize.mouseRayRadius=1
        modelSize.limitDistance=Particles.PixelToNdc(200)
        
    }




    if( modelToParticle.root){
         modelToParticle.root.scale.set(modelSize.scale,modelSize.scale,modelSize.scale);
        modelToParticle.root.position.copy(modelSize.position);
        modelToParticle.root.rotation.y=modelSize.rotationY;
    }
 
    starwarsParameters.startScale= modelSize.scale;
    starwarsParameters.startPosition.copy(modelSize.position);
    starwarsParameters.startRotation.y=modelSize.rotationY

    starwarsParameters.uMaxForce=modelSize.maxForce
    starwarsParameters.uMaxVelocity=modelSize.maxVelocity
    starwarsParameters.uMouseRayForce=modelSize.mouseRayForce
    starwarsParameters.uMouseRayRadius=modelSize.mouseRayRadius
    starwarsParameters.uLimitDistance=modelSize.limitDistance

    
   const uniforms = particles?.updateMesh?.material?.uniforms;

    if (uniforms?.uMaxForce) {
         uniforms.uMaxForce.value = modelSize.maxForce;
    }
    if (uniforms?.uMaxVelocity) {
         uniforms.uMaxVelocity.value = modelSize.maxVelocity;
    }
    if (uniforms?.uMouseRayRadius) {
         uniforms.uMouseRayRadius.value = modelSize.mouseRayRadius;
    }
    if (uniforms?.uMouseRayForce) {
         uniforms.uMouseRayForce.value = modelSize.mouseRayForce;
    }
    if (uniforms?.uLimitDistance) {
         uniforms.uLimitDistance.value = modelSize.limitDistance;
    }

}


const initParticle=async function() {


         modelToParticle=new  AnimatedModelToParticle(renderer,orthoCamera);
        
        await modelToParticle.LoadModel(modelLocation);
        ResizeModel();
        modelToParticle.root.scale.set(starwarsParameters.startScale,starwarsParameters.startScale,starwarsParameters.startScale);
        modelToParticle.root.rotation.y=starwarsParameters.startRotation.y;
        modelToParticle.root.position.copy(starwarsParameters.startPosition)
  modelToParticle.root.updateMatrixWorld(true);
      
        const particleInfo=modelToParticle.ConvertModelToParticles(starwarsParameters.subdivision);
      
        starwarsParameters.textureSize=particleInfo.textureDimension
        console.log(`Particle Count: ${particleInfo.textureDimension*particleInfo.textureDimension}`)
        
        particles=new Particles(renderer,orthoCamera);
        particles.UpdateTargetTexture(particleInfo.positionTexture)
        particles.Init(starwarsParameters);
              
        await particles.SetNoiseTexture({jsonUrl:"./noise/noise_50x50x50.json", binUrl:"./noise/noise_50x50x50.f32"}, starwarsParameters)


        renderScene.add(particles.renderMesh);

      

}
initParticle();


//RayCaster Force
let mouseForceDirection=new THREE.Vector3(0,1,0);
const rayCaster=new RayCaster(canvas,perspectiveCamera);
window.addEventListener("mousemove",(event)=>{

  const ray=  rayCaster.getRayFromMouse(event);
  mouseForceDirection.copy(ray.direction);

});


//Post Processing

const renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
        samples: 1
    }
)

/*

// Effect composer
const effectComposer = new EffectComposer(renderer, renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(window.innerWidth,window.innerHeight)

// Render pass
const renderPass = new RenderPass(renderScene, perspectiveCamera)
effectComposer.addPass(renderPass)


const unrealBloomPass = new UnrealBloomPass()
unrealBloomPass.enabled = true
effectComposer.addPass(unrealBloomPass)

unrealBloomPass.strength = 3.5
unrealBloomPass.radius = 0.1
unrealBloomPass.threshold = 0.1



window.addEventListener("resize",()=>{

      // Update effect composer
    effectComposer.setSize(window.innerWidth,window.innerHeight)
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

*/

window.addEventListener("resize",ResizeModel)


/**
 * Animate
 */

const clock = new THREE.Clock()
let previousTime = 0
let frameCount = 0;

const tick = () =>
{

      const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
   
    

    if(particles &&  modelToParticle){
        
        let particleInfo;

      


            particleInfo=  modelToParticle.UpdateAnimation(deltaTime);
            particles.UpdateTargetTexture(particleInfo.positionTexture);
        
     
             particles.SetMouseForce(perspectiveCamera.position,mouseForceDirection);
          
            
            particles.Update(elapsedTime);
             

    }
frameCount++;
  
    // Render
     //effectComposer.render()
   renderer.render(renderScene,perspectiveCamera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()