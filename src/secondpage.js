import { WordVisibleAnimation } from "./wordVisibleScroll.js";

const textPart=document.querySelector("div.second-page .text-part")
const title=textPart.querySelector("h1");
const bottomLine=textPart.querySelector("div.bottom-line");
const paragraph=textPart.querySelector("div.paragraph");
const hover3dArea=document.querySelector(".hover-3d-part .hover-area");
const hover3dImage=document.querySelector(".hover-3d-part .hover-area img");
const hoverParallaxArea=document.querySelector(".hover-parallax-part .hover-area");
const hoverParallaxImage=document.querySelector(".hover-parallax-part .hover-area img");


//parallax mouse move
const translateXMax=4;
const translateYMax=4;

let throttleParallax=true;
function ParallaxImage(e){

    const globalX=e.clientX;
    const globalY=e.clientY;

    const bou=hoverParallaxArea.getBoundingClientRect();

    const localX=((globalX - bou.left) / bou.width) * 2 -1;
    const localY=((globalY - bou.top) / bou.height) * -2 + 1;


    hoverParallaxImage.style.setProperty("--translateX", `${-localX*translateXMax}%`);
    hoverParallaxImage.style.setProperty("--translateY", `${localY*translateYMax}%`);

}


hoverParallaxArea.addEventListener("mousemove",(e)=>{


    if(throttleParallax){

        throttleParallax=false;

        requestAnimationFrame(()=>{

            ParallaxImage(e);
            throttleParallax=true;
        })
    }

});


hoverParallaxArea.addEventListener("mouseout",()=>{

  hoverParallaxImage.style.setProperty("--translateX", `${0}%`);
    hoverParallaxImage.style.setProperty("--translateY", `${0}%`);

});

//perspective mouse move
const rotateXMax= 20;
const rotateYMax=20;

let throttleRotate =true;
function RotateImage(e){

    const globalX=e.clientX;
    const globalY=e.clientY;

    const bou=hover3dArea.getBoundingClientRect();

    const localX=((globalX - bou.left) / bou.width) * 2 -1;
    const localY=((globalY - bou.top) / bou.height) * -2 + 1;


    hover3dImage.style.setProperty("--rotateY", `${localX*rotateXMax}deg`);
    hover3dImage.style.setProperty("--rotateX", `${localY*rotateYMax}deg`);


}


hover3dArea.addEventListener("mousemove",(e)=>{


        if(throttleRotate){
            throttleRotate=false;

            requestAnimationFrame(()=>{

                RotateImage(e);
                throttleRotate=true;

            })
            
        }


})

hover3dArea.addEventListener("mouseout",(e)=>{

   hover3dImage.style.setProperty("--rotateY", `${0}deg`);
    hover3dImage.style.setProperty("--rotateX", `${0}deg`);

       

})

//word become visible and hidden when scroll
function easeOutQuart(x) {
return 1 - Math.pow(1 - x, 4);
}

const wordScrollAnimation=new WordVisibleAnimation("I create memorable websites with smooth animations and interactive experiences.")
wordScrollAnimation.startAnimationHeightRatio=0.5
paragraph.append(wordScrollAnimation.container);
wordScrollAnimation.setAnimationProperties(200,50,easeOutQuart)
wordScrollAnimation.Start();

//bottom line of header animation
const bottomLineSize = function(){

    const bou=title.getBoundingClientRect();
    bottomLine.style.width=`${bou.width}px`;

      if(bou.top < window.innerHeight/3 ){

        bottomLine.classList.add("animate");
    }else{
        bottomLine.classList.remove("animate");
    }
}
bottomLineSize();
window.addEventListener("resize",bottomLineSize);


const throttle={

    enable:true,
    time:100
}

window.addEventListener("scroll",()=>{

    if(!throttle.enable){
        return;
    }

    throttle.enable=false;
    setTimeout(()=>{ throttle.enable=true;  },throttle.time);


    const bou=wordScrollAnimation.container.getBoundingClientRect();
    if(bou.top < window.innerHeight/2 ){

        bottomLine.classList.add("animate");
    }else{
        bottomLine.classList.remove("animate");
    }

})


