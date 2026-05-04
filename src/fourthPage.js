class AnimateScroll{

element;
start;
end;
scrollStart;
scrollEnd;
easing=function(x){return x;};

constructor(element){
this.element=element;
}



Animate(){

    const currentScroll=window.scrollY;
    let scrollRatio=(currentScroll-this.scrollStart) / (this.scrollEnd-this.scrollStart);
    scrollRatio=Math.min(1,Math.max(scrollRatio,0));
    const realRatio=this.easing(scrollRatio);
    
    return this.start + (this.end-this.start)*realRatio;

}

}

class ParallaxScroll extends AnimateScroll{

throttle=true;
valueSign="vh";
propertyName;

static parallaxAnimations=[];
static UpdateAll(){

    ParallaxScroll.parallaxAnimations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    ParallaxScroll.parallaxAnimations.push(this);
}

Animate(){

    const value=super.Animate();

    this.element.style.setProperty(this.propertyName,`${value+this.valueSign}`);
    this.throttle=true;
}

}


const fourthPage=document.querySelector("div.fourth-page")
const stickyImage=document.querySelector("div.fourth-page div.sticky-image")
const imageContainer=document.querySelector("div.fourth-page div.image-container")
const imageBlue=imageContainer.querySelector(".first-image.blue")
const imageBlack=imageContainer.querySelector(".first-image.black-white")

let bouFourthPage;

function UpdateBoundingBoxes(){

    bouFourthPage=fourthPage.getBoundingClientRect();

}
UpdateBoundingBoxes();



const imageParallax=new ParallaxScroll(imageBlue);
imageParallax.start=100;
imageParallax.end=0;
imageParallax.valueSign="%";
imageParallax.propertyName="--clipX"



const ClipPathScroll ={

throttle:true,
clipElement: fourthPage.querySelector("#clip"),
stripNumber:30,
scrollRangeBetweenStrips:4,
stripWidthDecrease:0.99,
clipWidthAnimation:{
    
    scrollStart:0,
    scrollEnd:0,
    start:0,
    end: undefined,


},
Animate(){

    if(this.throttle){
        this.throttle=false;

        requestAnimationFrame(()=>{

            const scrollY=window.scrollY;
            let activeStrip= Math.floor((scrollY - this.clipWidthAnimation.scrollStart) / this.scrollRangeBetweenStrips)  
            activeStrip= Math.min(Math.max(activeStrip,0),this.stripNumber);

             const offsetX=1/this.stripNumber;
             let currentWidth= offsetX * ((scrollY - this.clipWidthAnimation.scrollStart) / (this.clipWidthAnimation.scrollEnd - this.clipWidthAnimation.scrollStart));
             currentWidth = Math.max(currentWidth,0);
            
             let decreasePower=0;
             this.clipElement.innerHTML="";
           
             for(let i=this.stripNumber-1;i>this.stripNumber-1-activeStrip;i--){

                this.clipElement.innerHTML+=`<rect x="${offsetX*i}" y="0.0" width="${currentWidth*Math.pow(this.stripWidthDecrease,decreasePower)}" height="1"/>`;

                decreasePower++;
             }

             this.throttle=true;

        })
    }

    
}

}


class ClipPathDisappear extends AnimateScroll{

throttle=true;
valueSign="%";
propertyName;

static clipAnimations=[];
static UpdateAll(){

    ClipPathDisappear.clipAnimations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    ClipPathDisappear.clipAnimations.push(this);
}

Animate(){

    const value=super.Animate();

    this.element.style.setProperty(this.propertyName,`${value+this.valueSign}`);

    this.throttle=true;
}



}


const clipImageAnimation = new ClipPathDisappear(stickyImage);
clipImageAnimation.start=100;
clipImageAnimation.end=0;
clipImageAnimation.propertyName="--clipY"


class RotateImage extends AnimateScroll{


throttle=true;
valueSign="deg";
propertyName;

static rotateAnimations=[];
static UpdateAll(){

    RotateImage.rotateAnimations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    RotateImage.rotateAnimations.push(this);
}

Animate(){

    const value=super.Animate();

    this.element.style.setProperty(this.propertyName,`${value+this.valueSign}`);

  
    this.throttle=true;
}


}

const rotateImage = new RotateImage(imageContainer);
rotateImage.start=0;
rotateImage.end=-20;
rotateImage.propertyName="--rotate"


class TranslateImage extends AnimateScroll{


throttle=true;
valueSign="px";
propertyName;

static translateAnimations=[];
static UpdateAll(){

    TranslateImage.translateAnimations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    TranslateImage.translateAnimations.push(this);
}

Animate(){

    const value=super.Animate();

    this.element.style.setProperty(this.propertyName,`${value+this.valueSign}`);


    this.throttle=true;
}


}


const translateImage=new TranslateImage(imageContainer);
translateImage.start=0;
translateImage.end=-200;
translateImage.propertyName="--translate"


class OpacityAnimation extends AnimateScroll{


throttle=true;
valueSign="";
propertyName;

static opacityAnimations=[];
static UpdateAll(){

    OpacityAnimation.opacityAnimations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    OpacityAnimation.opacityAnimations.push(this);
}

Animate(){

    const value=super.Animate();

    this.element.style.setProperty(this.propertyName,`${value+this.valueSign}`);


    this.throttle=true;
}


}

const opacityAnimation = new OpacityAnimation(stickyImage);
opacityAnimation.start=1;
opacityAnimation.end=0;
opacityAnimation.propertyName="--opacity"


class MoveDown extends AnimateScroll{


throttle=true;
valueSign="";
propertyName;

static animations=[];
static UpdateAll(){

    MoveDown.animations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    MoveDown.animations.push(this);
}

Animate(){

    const value=super.Animate();

    this.element.style.setProperty(this.propertyName,`${value+this.valueSign}`);

  
    this.throttle=true;
}


}

const moveDownAnimation = new OpacityAnimation(stickyImage);
moveDownAnimation.start=0;
moveDownAnimation.end=700;
moveDownAnimation.valueSign="px"
moveDownAnimation.propertyName="--down"



function UpdateAnimationParameters(){
UpdateBoundingBoxes();
    const height=window.innerHeight;
    const top=bouFourthPage.top;
    const bottom=bouFourthPage.bottom

if(window.innerWidth<700){

    imageParallax.scrollStart=window.scrollY  + top - height*0.2;
    imageParallax.scrollEnd=imageParallax.scrollStart+1000;
    
clipImageAnimation.scrollStart=window.scrollY + bottom - window.innerHeight;
clipImageAnimation.scrollEnd=clipImageAnimation.scrollStart+1000;


rotateImage.scrollStart=window.scrollY + bottom - window.innerHeight;
rotateImage.scrollEnd=rotateImage.scrollStart+500;


translateImage.scrollStart=window.scrollY + bottom - window.innerHeight;
translateImage.scrollEnd=translateImage.scrollStart+500;

opacityAnimation.scrollStart=window.scrollY + bottom - window.innerHeight;
opacityAnimation.scrollEnd=opacityAnimation.scrollStart+800;

moveDownAnimation.scrollStart=window.scrollY + bottom - window.innerHeight;
moveDownAnimation.scrollEnd=moveDownAnimation.scrollStart + 1000;
moveDownAnimation.start=0;
moveDownAnimation.end=200;
}else{

    imageParallax.scrollStart=window.scrollY  + top;
    imageParallax.scrollEnd=imageParallax.scrollStart+1000;

    clipImageAnimation.scrollStart=window.scrollY + bottom - window.innerHeight;
clipImageAnimation.scrollEnd=clipImageAnimation.scrollStart+1000;


rotateImage.scrollStart=window.scrollY + bottom - window.innerHeight;
rotateImage.scrollEnd=rotateImage.scrollStart+500;


translateImage.scrollStart=window.scrollY + bottom - window.innerHeight;
translateImage.scrollEnd=translateImage.scrollStart+500;

opacityAnimation.scrollStart=window.scrollY + bottom - window.innerHeight;
opacityAnimation.scrollEnd=opacityAnimation.scrollStart+800;

moveDownAnimation.scrollStart=window.scrollY + bottom - window.innerHeight;
moveDownAnimation.scrollEnd=moveDownAnimation.scrollStart + 1000;
}



ClipPathScroll.clipWidthAnimation.scrollStart= imageParallax.scrollEnd + 50;
ClipPathScroll.clipWidthAnimation.scrollEnd=ClipPathScroll.clipWidthAnimation.scrollStart + 400;
ClipPathScroll.clipWidthAnimation.end=1/ClipPathScroll.stripNumber;

}


UpdateAnimationParameters();
window.addEventListener("resize",UpdateAnimationParameters);

window.addEventListener("scroll",()=>{
ParallaxScroll.UpdateAll();
ClipPathScroll.Animate();
ClipPathDisappear.UpdateAll();
RotateImage.UpdateAll();
TranslateImage.UpdateAll();
OpacityAnimation.UpdateAll();
MoveDown.UpdateAll();
})
