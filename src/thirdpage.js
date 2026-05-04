const thirdPage=document.querySelector("div.third-page")
const titleContainer=document.querySelector("div.title-container");
const title=titleContainer.querySelector("h1");
const parallaxContainer=document.querySelector("div.parallax-container");
const paragraph=parallaxContainer.querySelector(".text-item p");
const parallaxItemSlow = parallaxContainer.querySelector(".parallax-item.slow")
const parallaxItemFast = parallaxContainer.querySelector(".parallax-item.fast")
const parallaxItemSpeedy = parallaxContainer.querySelector(".parallax-item.speedy")
const parallaxImageContainerSlow=parallaxItemSlow.querySelector(".img-container");
const parallaxImageContainerFast=parallaxItemFast.querySelector(".img-container");
const parallaxImageContainerSpeedy=parallaxItemSpeedy.querySelector(".img-container");
const parallaxImageSlow=parallaxImageContainerSlow.querySelector("img");
const parallaxImageFast=parallaxImageContainerFast.querySelector("img");
const parallaxImageSpeedy=parallaxImageContainerSpeedy.querySelector("img");
const parallaxLabelSlow=parallaxItemSlow.querySelector("h1.label");
const parallaxLabelFast=parallaxItemFast.querySelector("h1.label");
const parallaxLabelSpeedy=parallaxItemFast.querySelector("h1.label.speedy");

let bouTitleContainer;
let bouParallaxContainer;
let bouParallaxParagraph;
let bouSlowImageContainer;
let bouFastImageContainer;
let bouSpeedyImageContainer;
let bouSlowLabel;
let bouFastLabel;
let bouSpeedyLabel;

function UpdateBoundingClientRects(){

     bouTitleContainer=titleContainer.getBoundingClientRect();
     bouParallaxContainer=parallaxContainer.getBoundingClientRect();
     bouParallaxParagraph=paragraph.getBoundingClientRect();

     bouSlowImageContainer=parallaxImageContainerSlow.getBoundingClientRect();
     bouFastImageContainer=parallaxImageContainerFast.getBoundingClientRect();
     bouSpeedyImageContainer=parallaxImageContainerSpeedy.getBoundingClientRect();

     bouSlowLabel=parallaxLabelSlow.getBoundingClientRect();
     bouFastLabel=parallaxLabelFast.getBoundingClientRect();
     bouSpeedyLabel=parallaxLabelSpeedy.getBoundingClientRect();;


}
UpdateBoundingClientRects();
window.addEventListener("resize",UpdateBoundingClientRects);
    


function CalculateThirdPageHeight(){

const extraHeight=0;
const minHeight=bouParallaxContainer.bottom - bouTitleContainer.top;

thirdPage.style.minHeight=`${minHeight+extraHeight}px`;

}
CalculateThirdPageHeight();
window.addEventListener("resize",CalculateThirdPageHeight)



//title opacity anim
const titleOpacityAnimation={

throttle:true,
startScroll:0,
endScroll:0,
start:1,
end:0,
easing:function(x) {
return x * x * x;
},
Animate(){

    const currentScroll=window.scrollY;
    const totalScroll=this.endScroll-this.startScroll;
    const scrollRatio=Math.min(1,Math.max((currentScroll - this.startScroll)/totalScroll,0));

    const realRatio=this.easing(scrollRatio);
    const opacity= this.start + (this.end-this.start)*realRatio;;
    title.style.opacity=`${opacity}`;

    
}

}


function UpdateTitleOpacityParameters(){

    if(window.innerWidth<700){

        titleOpacityAnimation.startScroll=bouTitleContainer.top + window.scrollY - window.innerHeight + window.innerHeight*0.2;
        titleOpacityAnimation.endScroll=bouParallaxParagraph.top + window.scrollY - window.innerHeight + window.innerHeight*0.5;;

    }else{
  titleOpacityAnimation.startScroll=bouTitleContainer.top + window.scrollY - window.innerHeight + window.innerHeight*0.2;
        titleOpacityAnimation.endScroll=bouParallaxParagraph.top + window.scrollY - window.innerHeight + window.innerHeight*0.5;;
    }

   
}
UpdateTitleOpacityParameters();
titleOpacityAnimation.Animate();

window.addEventListener("resize",()=>{
    UpdateTitleOpacityParameters();
    titleOpacityAnimation.Animate();
    
});






class ParallaxDivAnimation{

element;
throttle=true;
easing=function(x){return x;}
startScroll;
endScroll;
start;
end;

constructor(div){
    this.element=div;
}

Animate(){

    const currentScroll=window.scrollY;
    const totalScroll=this.endScroll-this.startScroll;
    const scrollRatio= Math.max(0, Math.min(1, (currentScroll-this.startScroll)/totalScroll));

    const realRatio=this.easing(scrollRatio);
    const translateY=this.start + (this.end-this.start)*realRatio;

    this.element.style.transform=`translateY(${translateY}px)`;

}

}





window.addEventListener("scroll",()=>{


    if(titleOpacityAnimation.throttle){
       
        titleOpacityAnimation.throttle=false;

        requestAnimationFrame(()=>{

            titleOpacityAnimation.Animate();
            titleOpacityAnimation.throttle=true;
        })

    }

})


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
    this.element.style.setProperty("--translateY",`${value+this.valueSign}`);
    this.throttle=true;
}

}

class OpacityScroll extends AnimateScroll{

throttle=true;


static opacityAnimations=[];
static UpdateAll(){

    OpacityScroll.opacityAnimations.forEach(anim=>{

        if(anim.throttle){
            anim.throttle=false;

            requestAnimationFrame(anim.Animate.bind(anim));
        }
    })
}

constructor(element){
    super(element);
    OpacityScroll.opacityAnimations.push(this);
}


Animate(){

    const value=super.Animate();
    this.element.style.setProperty("--opacity",`${value}`);
    this.throttle=true;
}


}

//parallax translate part
const slowImage=new ParallaxScroll(parallaxImageContainerSlow);
slowImage.start=0;
slowImage.end=20;

const fastImage=new ParallaxScroll(parallaxImageContainerFast);
fastImage.start=0;
fastImage.end=-5;

const speedyImage=new ParallaxScroll(parallaxImageContainerSpeedy);
speedyImage.start=0;
speedyImage.end=10;

const paragraphPart=new ParallaxScroll(paragraph);
paragraphPart.start=0;
paragraphPart.end=2;



//opacity part
const slowImageOpacity=new OpacityScroll(parallaxImageContainerSlow);
slowImageOpacity.start=0;
slowImageOpacity.end=1;

const fastImageOpacity=new OpacityScroll(parallaxImageContainerFast);
fastImageOpacity.start=0;
fastImageOpacity.end=1;

const speedyImageOpacity=new OpacityScroll(parallaxImageContainerSpeedy);
speedyImageOpacity.start=0;
speedyImageOpacity.end=1;

const paragraphPartOpacity=new OpacityScroll(paragraph);
paragraphPartOpacity.start=0;
paragraphPartOpacity.end=1;



//parallax label
const slowLabel=new ParallaxScroll(parallaxLabelSlow);
slowLabel.start=0;
slowLabel.end=40;

const fastLabel=new ParallaxScroll(parallaxLabelFast);
fastLabel.start=0;
fastLabel.end=-90;

const speedyLabel=new ParallaxScroll(parallaxLabelSpeedy);
speedyLabel.start=0;
speedyLabel.end=-40;


//parallax image inside div
const slowImageInside=new ParallaxScroll(parallaxImageSlow);
slowImageInside.valueSign="%"
slowImageInside.start=0;
slowImageInside.end=20;

const fastImageInside=new ParallaxScroll(parallaxImageFast);
fastImageInside.valueSign="%"
fastImageInside.start=0;
fastImageInside.end=20;

const speedyImageInside=new ParallaxScroll(parallaxImageSpeedy);
speedyImageInside.valueSign="%"
speedyImageInside.start=0;
speedyImageInside.end=20;


function UpdateScrollPropertiesImageContainer(){

    if(window.innerWidth>=700){

        slowImage.start=0;
        slowImage.end=25;
            
            
        fastImage.start=0;
        fastImage.end=-10;
            
            
        speedyImage.start=0;
        speedyImage.end=-5;
            
        paragraphPart.start=0;
        paragraphPart.end=20;

        fastLabel.start=0;
        fastLabel.end=-50;

        speedyLabel.start=0;
        speedyLabel.end=-30;

    }else{
   
        slowImage.start=0;
        slowImage.end=20;


        fastImage.start=0;
        fastImage.end=-5;


        speedyImage.start=0;
        speedyImage.end=10;

        paragraphPart.start=0;
        paragraphPart.end=2;

        fastLabel.start=0;
        fastLabel.end=-50;

        speedyLabel.start=0;
        speedyLabel.end=-20;


    }

    slowImage.scrollStart=window.scrollY-window.innerHeight+bouSlowImageContainer.top;
    slowImage.scrollEnd=slowImage.scrollStart+ window.innerHeight*1.5;

    
    fastImage.scrollStart=window.scrollY-window.innerHeight+bouFastImageContainer.top;
    fastImage.scrollEnd=fastImage.scrollStart+ window.innerHeight;


    speedyImage.scrollStart=window.scrollY-window.innerHeight+bouSpeedyImageContainer.top;
    speedyImage.scrollEnd=speedyImage.scrollStart+ window.innerHeight*1;

     paragraphPart.scrollStart=window.scrollY-window.innerHeight+bouParallaxParagraph.top;
    paragraphPart.scrollEnd=paragraphPart.scrollStart+ window.innerHeight;


    slowImageOpacity.scrollStart=slowImage.scrollStart;
    slowImageOpacity.scrollEnd=slowImageOpacity.scrollStart+bouSlowImageContainer.height * 1.2

    fastImageOpacity.scrollStart=fastImage.scrollStart;
    fastImageOpacity.scrollEnd=fastImageOpacity.scrollStart+bouFastImageContainer.height * 0.75

    speedyImageOpacity.scrollStart=speedyImage.scrollStart;
    speedyImageOpacity.scrollEnd=speedyImageOpacity.scrollStart+bouSpeedyImageContainer.height * 0.5

    paragraphPartOpacity.scrollStart=paragraphPart.scrollStart;
    paragraphPartOpacity.scrollEnd=paragraphPartOpacity.scrollStart+bouParallaxParagraph.height * 2

     slowLabel.scrollStart=window.scrollY-window.innerHeight+bouSlowLabel.top;
    slowLabel.scrollEnd=slowLabel.scrollStart+ window.innerHeight*1.5;

    fastLabel.scrollStart=window.scrollY-window.innerHeight+bouFastLabel.top;
    fastLabel.scrollEnd=fastLabel.scrollStart+ window.innerHeight*1.5;

    speedyLabel.scrollStart=window.scrollY-window.innerHeight+bouSpeedyLabel.top;
    speedyLabel.scrollEnd=speedyLabel.scrollStart+ window.innerHeight*1.5;

    
    slowImageInside.scrollStart=window.scrollY-window.innerHeight+bouSlowImageContainer.top;
    slowImageInside.scrollEnd=slowImageInside.scrollStart+ window.innerHeight*1.5;

     fastImageInside.scrollStart=window.scrollY-window.innerHeight+bouFastImageContainer.top;
    fastImageInside.scrollEnd=fastImageInside.scrollStart+ window.innerHeight*1.5;

     speedyImageInside.scrollStart=window.scrollY-window.innerHeight+bouSpeedyImageContainer.top;
    speedyImageInside.scrollEnd=speedyImageInside.scrollStart+ window.innerHeight*1.5;

    
    


}
UpdateScrollPropertiesImageContainer();
ParallaxScroll.UpdateAll();

window.addEventListener("resize",()=>{
    UpdateScrollPropertiesImageContainer();
    ParallaxScroll.UpdateAll();
    OpacityScroll.UpdateAll();
    
})

window.addEventListener("scroll",()=>{
    ParallaxScroll.UpdateAll();
    OpacityScroll.UpdateAll();
})
