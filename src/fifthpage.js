
import { WordVisibleAnimation } from "./wordVisibleScroll.js";
import {ScrollTriggeredAnimation, ScrollDrivenAnimation} from "./animation.js"

const fifthPage=document.querySelector("div.fifth-page");
const titleContainer=document.querySelector("div.fifth-page div.title-container");
const title=titleContainer.querySelector("h1");
const paragraph=document.querySelector("div.fifth-page div.paragraph");


//word become visible and hidden when scroll
function easeOutQuart(x) {
return 1 - Math.pow(1 - x, 4);
}

const wordScrollAnimation=new WordVisibleAnimation("I worked on 3d graphics with c++ and opengl library, web animations with css/js and three.js library")
wordScrollAnimation.startAnimationHeightRatio=0.8
paragraph.append(wordScrollAnimation.container);
wordScrollAnimation.setAnimationProperties(200,50,easeOutQuart)
wordScrollAnimation.Start();

//Line animation ----------------------------------------------------------------
const line=titleContainer.querySelector("div.line");
let lineBounding=line.getBoundingClientRect();

const lineAnimation=new ScrollTriggeredAnimation();
lineAnimation.addProperty({element: line, propertyName: "--scale", propertySign: "%", start:0,end:100});

lineAnimation.scrollStart=lineBounding.top - window.innerHeight + window.scrollY + window.innerHeight * 0.3;
lineAnimation.duration=700;
lineAnimation.easing=function (x) {return x * x;}
lineAnimation.reverse=true;
lineAnimation.start();

function UpdateLineBounding(){
    lineBounding=line.getBoundingClientRect();
    
    lineAnimation.scrollStart=lineBounding.top - window.innerHeight + window.scrollY + window.innerHeight * 0.22;
    lineAnimation.updateSettings(); //when change setting apply iy
}
UpdateLineBounding();
window.addEventListener("resize",UpdateLineBounding);


//projects part ------------------------------------------------

class Project{

static container = fifthPage.querySelector("div.projects-container")

title;
imageUrl;
imageCoverPosition={x:50,y:50,}
number;
paragraph;

constructor(title,number){
    this.title=title;
    this.number=number;
}


Create(){

    const project=document.createElement("div");
    project.classList.add("project");

    project.innerHTML=`
                    <div class="title-container"> 
                    <h1 class="title">${this.title}</h1>
                    </div>

                   <div class="info">
                    <div class="image-container">
                        <img src="${this.imageUrl}" alt="" srcset="">
                    </div>
                    <div class="text-container">
                        <h1 class="number">${this.number}</h1>
                        <p>${this.paragraph}</p>
                    </div>
                     </div>

    `;

    project.querySelector("img").style.objectPosition=`${this.imageCoverPosition.x}% ${this.imageCoverPosition.y}%`

    Project.container.append(project);

}



}



const project1=new Project("MY WEBSITE","01.");
project1.imageUrl="./textures/projects/mywebsite.png";
project1.imageCoverPosition.x=50;
project1.imageCoverPosition.y=3;
project1.paragraph="My main website that I show my projects and share my knowledge about c++, opengl, 3D math and graphics, vanilla css/js, three.js"
project1.Create();

const project6=new Project("MY GAME ENGINE","02.");
project6.imageUrl="./textures/projects/openglengine.jpg";
project6.imageCoverPosition.x=50;
project6.imageCoverPosition.y=50;
project6.paragraph="My game engine created using c++ and opengl. Currently in development stage."
project6.Create();


const project2=new Project("BLACK HOLE","03.");
project2.imageUrl="./textures/projects/blackhole.png";
project2.imageCoverPosition.x=50;
project2.imageCoverPosition.y=50;
project2.paragraph="Creating a black hole by gpgpu particles rotating around using three.js and rendertargets"
project2.Create();


const project3=new Project("PIXEL RAIN","04.");
project3.imageUrl="./textures/projects/pixelrain.jpg";
project3.imageCoverPosition.x=50;
project3.imageCoverPosition.y=50;
project3.paragraph="Particles are flowing down from top of image to bottom while they are affected by mouse force"
project3.Create();


const project4=new Project("RANDOM WEBSITE - 1","05.");
project4.imageUrl="./textures/projects/randomwebsite1.png";
project4.imageCoverPosition.x=50;
project4.imageCoverPosition.y=50;
project4.paragraph="A random website that uses only vanilla css and javascript for creating fascinating 3D image animation"
project4.Create();


const project5=new Project("ORBITAL MOTION","06.");
project5.imageUrl="./textures/projects/orbitalmotion.png";
project5.imageCoverPosition.x=50;
project5.imageCoverPosition.y=50;
project5.paragraph="Particles moving around orbit are also affected by forces. Created by using three.js and rendertargets"
project5.Create();


const project7=new Project("RAY MARCHING","07.");
project7.imageUrl="./textures/projects/raymarching.jpg";
project7.imageCoverPosition.x=50;
project7.imageCoverPosition.y=50;
project7.paragraph="Using ray marching technique to create 3d terrain without using any meshes having vertices. It uses 3D fbm noise to draw terrain into 2D plane"
project7.Create();



const project8=new Project("ANIMATED 3D PARTICLE MODEL","08.");
project8.imageUrl="./textures/projects/animatedmodel.png";
project8.imageCoverPosition.x=50;
project8.imageCoverPosition.y=20;
project8.paragraph="Vertex data from 3D model is gathered into 2D texture and used by randomly moving particles. 3D noise texture and mouse forces also affect particles "
project8.Create();



const projects=fifthPage.querySelectorAll("div.projects-container .project")
projects.forEach(project=>{

    const titleContainer=project.querySelector(".title-container");
    const title=titleContainer.querySelector("h1");
    const info=project.querySelector(".info");

    let infoBounding;
    let titleBounding;

    const UpdateProjectBounding=()=>{
        
        infoBounding=info.getBoundingClientRect();
        titleBounding=title.getBoundingClientRect();
       
    }
    UpdateProjectBounding();

    const projectAnimation=new ScrollTriggeredAnimation();
    projectAnimation.addProperty({element: info, propertyName: "--scale",  propertySign: "", start:0.7,end:1});
    projectAnimation.addProperty({element: info, propertyName: "--opacity",  propertySign: "", start:0,end:1});

    projectAnimation.scrollStart=infoBounding.top - window.innerHeight + window.scrollY + window.innerHeight*0.03;
    projectAnimation.duration=400;
    projectAnimation.easing=function (x) {return x * x;}
    projectAnimation.reverse=true;
    projectAnimation.start();


    const titleAnimation=new ScrollTriggeredAnimation();
    titleAnimation.addProperty({element: title, propertyName: "--translate",  propertySign: "%", start:100,end:0});
  
    titleAnimation.scrollStart=titleBounding.top - window.innerHeight + window.scrollY + window.innerHeight*0.03;
    titleAnimation.duration=400;
    titleAnimation.easing=function (x) {return x * x;}
    titleAnimation.reverse=true;
    titleAnimation.start();

    window.addEventListener("resize",()=>{

        UpdateProjectBounding();

        titleAnimation.scrollStart=titleBounding.top - window.innerHeight + window.scrollY + window.innerHeight;
         titleAnimation.updateSettings();

        projectAnimation.scrollStart=infoBounding.top - window.innerHeight + window.scrollY + window.innerHeight*0.03;
        projectAnimation.updateSettings();
        
    })



});