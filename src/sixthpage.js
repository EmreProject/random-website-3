import { WordVisibleAnimation } from "./wordVisibleScroll.js";
import {ScrollTriggeredAnimation, ScrollDrivenAnimation} from "./animation.js"




//word become visible and hidden when scroll------------------------------------------------------
const paragraph=document.querySelector("div.sixth-page div.paragraph");
function easeOutQuart(x) {
return 1 - Math.pow(1 - x, 4);
}

const wordScrollAnimation=new WordVisibleAnimation("I have been working more than 10 years in 3d graphics, frontend and backend web development, ui/ux design.")
wordScrollAnimation.startAnimationHeightRatio=0.8
paragraph.append(wordScrollAnimation.container);
wordScrollAnimation.setAnimationProperties(200,50,easeOutQuart)
wordScrollAnimation.Start();


//Line animation ----------------------------------------------------------------
const titleContainer=document.querySelector("div.sixth-page div.title-container")
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


//skills
const sixthPage=document.querySelector("div.sixth-page");

class Skill{

static container=sixthPage.querySelector("div.skills")

bounding;
animation;
number;
title;
info;

#updateBoundingBox(){

    this.bounding=Skill.container.getBoundingClientRect();
    this.animation.scrollStart=this.bounding.top - window.innerHeight + window.scrollY + window.innerHeight * 0.3;


}

constructor(number,title){

this.number=`${number<10?"0"+number:number}.`;
this.title=title;

}


addInfo(text){
this.info=text;
}

create(){

    const skill=document.createElement("div");
    skill.classList.add("skill");

    this.animation=new ScrollTriggeredAnimation();
    this.animation.addProperty({element:skill,propertyName:"--opacity",propertySign:"",start:0,end:1})

    this.#updateBoundingBox();

    this.animation.duration=500;
    this.animation.easing=function (x) {return x * x;}
    this.animation.reverse=true;
    this.animation.start();

    window.addEventListener("resize",this.#updateBoundingBox.bind(this))


    skill.innerHTML=`
        <h3 class="number">${this.number}</h1>
        <h1 class="title">${this.title}</h1>
        <p class="info">
           ${this.info}
        </p>
    `

    Skill.container.append(skill);
}

}

class SkillLine{

static container=sixthPage.querySelector("div.skills")
line;
lineBounding;
lineAnimation;


#updateBoundingBox(){
    this.lineBounding=SkillLine.container.getBoundingClientRect();
    this.lineAnimation.scrollStart=this.lineBounding.top - window.innerHeight + window.scrollY + window.innerHeight * 0.3;
}
constructor(){

    this.line=document.createElement("div");
    this.line.classList.add("line");
    

    this.lineAnimation=new ScrollTriggeredAnimation();
    this.lineAnimation.addProperty({element:this.line,propertyName:"--scale",propertySign:"%",start:0,end:100});

     this.#updateBoundingBox();

    this.lineAnimation.duration=700;
    this.lineAnimation.easing=function (x) {return x * x;}
    this.lineAnimation.reverse=true;
    this.lineAnimation.start();


    window.addEventListener("resize",this.#updateBoundingBox.bind(this));

}

create(){
    SkillLine.container.append(this.line);
}

}


const line1=new SkillLine();
line1.create();
const skill1 = new Skill(1,"Game Engine Development");
skill1.addInfo("Currently developing my own game engine using c++ and opengl graphics api");
skill1.create();

const line2=new SkillLine();
line2.create();
const skill2 = new Skill(2,"Web Development");
skill2.addInfo("Deep knowledge and experience about html/css/javascript, three.js and node.js/express/mongodb");
skill2.create();


const line3=new SkillLine();
line3.create();
const skill3 = new Skill(3,"Web Design");
skill3.addInfo("I mainly use figma for ui/ux design for my websites and get inspirations from awwwards, lapa.ninja, dribble, behance and webflow");
skill3.create();


const line4=new SkillLine();
line4.create();
const skill4 = new Skill(4,"Vanilla JS animation");
skill4.addInfo("I prefer not to use any third party libraries for javascript dom elemet animation, I use my own libraries for scroll triggred and scroll driven animation");
skill4.create();



const line5=new SkillLine();
line5.create();
const skill5 = new Skill(5,"Particle Systems");
skill5.addInfo("I create 3D particle systems and apply physics for creating amazing particle animations.");
skill5.create();




const line6=new SkillLine();
line6.create();





const titleContainer2=sixthPage.querySelectorAll(".title-container")[1]
const line2_=titleContainer2.querySelector("div.line");
let lineBounding2=line2_.getBoundingClientRect();

const lineAnimation2=new ScrollTriggeredAnimation();
lineAnimation2.addProperty({element: line2_, propertyName: "--scale", propertySign: "%", start:0,end:100});

lineAnimation2.scrollStart=lineBounding2.top - window.innerHeight + window.scrollY + window.innerHeight * 0.3;
lineAnimation2.duration=700;
lineAnimation2.easing=function (x) {return x * x;}
lineAnimation2.reverse=true;
lineAnimation2.start();

function UpdateLineBounding2(){
    lineBounding2=line2_.getBoundingClientRect();
    
    lineAnimation2.scrollStart=lineBounding2.top - window.innerHeight + window.scrollY + window.innerHeight * 0.22;
    lineAnimation2.updateSettings(); //when change setting apply iy
}
UpdateLineBounding2();
window.addEventListener("resize",UpdateLineBounding2);




const contact= sixthPage.querySelector(".text-container p")
let contactBounding;
const contactAnimation=new ScrollTriggeredAnimation();
contactAnimation.addProperty({element:contact,propertyName:"--opacity",propertySign:"",start:0,end:1});

function updateBoundingContact(){

    contactBounding =contact.getBoundingClientRect();
    contactAnimation.scrollStart=contactBounding.top - window.innerHeight + window.scrollY + window.innerHeight * 0.05;
}

updateBoundingContact();

    contactAnimation.duration=700;
    contactAnimation.easing=function (x) {return x * x;}
    contactAnimation.reverse=true;
    contactAnimation.start();


    window.addEventListener("resize",updateBoundingContact);
