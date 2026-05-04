const navbar=document.querySelector("div.navbar");
const logo=document.querySelector("div.title");
const menuBig=document.querySelector("div.menu-big-width");
const menuSmall=document.querySelector("div.menu-small-width")
const menuSymbol=document.querySelector("div.menu-symbol")
const menuSymbolTop=document.querySelector("div.menu-symbol .top")
const menuSymbolMiddle=document.querySelector("div.menu-symbol .middle")
const menuSymbolBottom=document.querySelector("div.menu-symbol .bottom")
const right=document.querySelector("div.right");
const language=document.querySelector("div.language");
const languageOptionsMenu=document.querySelector("div.language .options");
const languageOptions=document.querySelectorAll("div.language .options .option")



//languge open close---------------------------------------------

language.addEventListener("click",(e)=>{


    if(!e.target.closest(".options")){

        languageOptionsMenu.classList.toggle("click");
    }

})

languageOptionsMenu.addEventListener("click",(e)=>{

if(e.target.classList.contains("option")){

    languageOptions.forEach(option=>{

        option.classList.remove("choosen");
    })

    e.target.classList.add("choosen");
    language.querySelector("h1").textContent=e.target.textContent

}

});



//Menu open close animation--------------------------------------

let currentStatus="close";
let currentMenu="";
const currentMenuChangeWidth=500;


const menuResize=()=>{

if(window.innerWidth>currentMenuChangeWidth){
    currentMenu="big";
    menuBig.classList.remove("inactive");
    menuSmall.classList.add("inactive");
}else{

    if(currentMenu=="big"){
         currentStatus="close"
            MenuSymbolClose();

         menuBigCloseAnimation.reset();
         menuBigOpenAnimation.reset();
         menuSmallCloseAnimation.reset();
         menuSmallOpenAnimation.reset();

         menuBig.style.setProperty("--translate",`${menuBigOpenAnimation.start}%`)
        menuSmall.style.setProperty("--translate",`${menuSmallOpenAnimation.start}%`)
        
    }

    
    currentMenu="small"
    menuBig.classList.add("inactive");
    menuSmall.classList.remove("inactive");

   
}

}
window.addEventListener("resize",menuResize);
menuResize();



const menuBigOpenAnimation={

    
    currentAnimation:undefined,
    start:-320,
    end:0,
    startTime:undefined,
    currentTime:undefined,
    duration:500,
    easing (x) {
        return 1 - Math.pow(1 - x, 4);
    },
    animate(time){

        this.currentTime=time;
        if(!this.startTime){
            this.startTime=time;
        }

        const timeRatio=Math.max(Math.min((time-this.startTime)/this.duration,1),0);
        const realRatio=this.easing(timeRatio);

        const currentValue=realRatio*(this.end-this.start) + this.start;

        menuBig.style.setProperty("--translate",`${currentValue}%`)

        if(timeRatio<1){
            this.currentAnimation=requestAnimationFrame(this.animate.bind(this));
        }else{
            this.reset();

        }
    },
    reset(){
         cancelAnimationFrame(this.currentAnimation);
         this.currentAnimation=undefined;
         this.currentTime=undefined;
         this.startTime=undefined;
           
    },
    Start(){

        requestAnimationFrame(this.animate.bind(this));
    }



}


const menuBigCloseAnimation={


    currentAnimation:undefined,
    start:0,
    end:-320,
    currentTime:undefined,
    startTime:undefined,
    duration:500,
    easing(x){
       return  1-menuBigOpenAnimation.easing(1-x)
    },
    animate(time){

        this.currentTime=time;
        if(!this.startTime){
            this.startTime=time;
        }

        const timeRatio=Math.max(Math.min((time-this.startTime)/this.duration,1),0);
        const realRatio=this.easing(timeRatio);

        const currentValue=realRatio*(this.end-this.start) + this.start;

        menuBig.style.setProperty("--translate",`${currentValue}%`)

        if(timeRatio<1){
            this.currentAnimation=requestAnimationFrame(this.animate.bind(this));
        }else{
            this.reset();

        }
    },
    reset(){
        cancelAnimationFrame(this.currentAnimation);
        this.currentAnimation=undefined;
        this.currentTime=undefined;
        this.startTime=undefined;
    
    },
    Start(){

        requestAnimationFrame(this.animate.bind(this));
    }




}


const menuSmallOpenAnimation={

    
    currentAnimation:undefined,
    start:100,
    end:0,
    startTime:undefined,
    currentTime:undefined,
    duration:500,
    easing (x) {
        return 1 - Math.pow(1 - x, 4);
    },
    animate(time){

        this.currentTime=time;
        if(!this.startTime){
            this.startTime=time;
        }

        const timeRatio=Math.max(Math.min((time-this.startTime)/this.duration,1),0);
        const realRatio=this.easing(timeRatio);

        const currentValue=realRatio*(this.end-this.start) + this.start;

        menuSmall.style.setProperty("--translate",`${currentValue}%`)

        if(timeRatio<1){
            this.currentAnimation=requestAnimationFrame(this.animate.bind(this));
        }else{
            this.reset();

        }
    },
    reset(){
         cancelAnimationFrame(this.currentAnimation);
         this.currentAnimation=undefined;
         this.currentTime=undefined;
         this.startTime=undefined;
           
    },
    Start(){

        requestAnimationFrame(this.animate.bind(this));
    }



}


const menuSmallCloseAnimation={


    currentAnimation:undefined,
    start:0,
    end:100,
    currentTime:undefined,
    startTime:undefined,
    duration:500,
    easing(x){
       return  1-menuBigOpenAnimation.easing(1-x)
    },
    animate(time){

        this.currentTime=time;
        if(!this.startTime){
            this.startTime=time;
        }

        const timeRatio=Math.max(Math.min((time-this.startTime)/this.duration,1),0);
        const realRatio=this.easing(timeRatio);

        const currentValue=realRatio*(this.end-this.start) + this.start;

        menuSmall.style.setProperty("--translate",`${currentValue}%`)

        if(timeRatio<1){
            this.currentAnimation=requestAnimationFrame(this.animate.bind(this));
        }else{
            this.reset();

        }
    },
    reset(){
        cancelAnimationFrame(this.currentAnimation);
        this.currentAnimation=undefined;
        this.currentTime=undefined;
        this.startTime=undefined;
    
    },
    Start(){

        requestAnimationFrame(this.animate.bind(this));
    }




}


function MenuSymbolOpen(){

    menuSymbolTop.classList.add("menu-open")
    menuSymbolMiddle.classList.add("menu-open")
    menuSymbolBottom.classList.add("menu-open")

}
function MenuSymbolClose(){

    menuSymbolTop.classList.remove("menu-open")
    menuSymbolMiddle.classList.remove("menu-open")
    menuSymbolBottom.classList.remove("menu-open")

}

menuSymbol.addEventListener("click",()=>{

if(currentStatus=="close"){
    currentStatus="open";
    MenuSymbolOpen();

    if(menuBigCloseAnimation.currentAnimation){

        const currentTime=menuBigCloseAnimation.currentTime
        const timePass=currentTime-menuBigCloseAnimation.startTime;
        
        menuBigOpenAnimation.startTime=currentTime-(menuBigOpenAnimation.duration-timePass);
    }

    if(menuSmallCloseAnimation.currentAnimation){

        const currentTime=menuSmallCloseAnimation.currentTime
        const timePass=currentTime-menuSmallCloseAnimation.startTime;
        
        menuSmallOpenAnimation.startTime=currentTime-(menuSmallOpenAnimation.duration-timePass);
    }

    menuBigCloseAnimation.reset();
    menuBigOpenAnimation.Start();

    menuSmallCloseAnimation.reset();
    menuSmallOpenAnimation.Start();
}else{
    currentStatus="close"
    MenuSymbolClose();

     if(menuBigOpenAnimation.currentAnimation){

        const currentTime=menuBigOpenAnimation.currentTime
        const timePass=currentTime-menuBigOpenAnimation.startTime;
        
        menuBigCloseAnimation.startTime=currentTime-(menuBigCloseAnimation.duration-timePass);
    }


     if(menuSmallOpenAnimation.currentAnimation){

        const currentTime=menuSmallOpenAnimation.currentTime
        const timePass=currentTime-menuSmallOpenAnimation.startTime;
        
        menuSmallCloseAnimation.startTime=currentTime-(menuSmallCloseAnimation.duration-timePass);
    }

    menuBigOpenAnimation.reset();
    menuBigCloseAnimation.Start();

    menuSmallOpenAnimation.reset();
    menuSmallCloseAnimation.Start();
}

})



