
class Word{

    spanContainer;
    span;
  

    constructor(spanContainer,span){

        this.spanContainer=spanContainer;
        this.span=span;
        this.forwardAnimation.span=span;
        this.backwardAnimation.span=span;
    }

    setAnimationProperties(easing,duration){

      
        this.forwardAnimation.duration=duration;
        this.forwardAnimation.easing=easing;
       

        this.backwardAnimation.duration=duration;
        this.backwardAnimation.easing= function(timeFraction) {
                 return 1 - easing(1 - timeFraction);
                };



    }

    forwardAnimation={
        span:undefined,
        currentAnimation:undefined,
        duration:undefined,
        delay:0,
        easing:undefined,
        startTime:undefined,
        currentTime:undefined,
        timePassRatio:undefined,
        reset(){

             this.delay=undefined;
                 this.startTime=undefined;
                 this.currentTime=undefined;
                 this.currentAnimation=undefined;
                 this.timePassRatio=1;
        },
        animate(time){

            if(!this.startTime){
                this.startTime=time+this.delay;
            }
            
            this.currentTime=time;
            this.timePassRatio=Math.max(Math.min((time-this.startTime)/this.duration,1),0);
            const realRatio=this.easing( this.timePassRatio);

            this.span.style.transform=`translateY(${100 - realRatio*100}%)`

            if(this.timePassRatio<1){
               this.currentAnimation=  requestAnimationFrame(this.animate.bind(this))
            }else{

            this.reset();
            }
        
        },
        Start(){
            requestAnimationFrame(this.animate.bind(this));
        }

    }

    backwardAnimation={
        span:undefined,
        currentAnimation:undefined,
        duration:undefined,
        delay:0,
        easing:undefined,
        startTime:undefined,
        currentTime:undefined,
        timePassRatio:undefined,
        reset(){
                this.delay=undefined;
                 this.startTime=undefined;
                 this.currentTime=undefined;
                 this.currentAnimation=undefined;
                 this.timePassRatio=1;

        },
        animate(time){

            if(!this.startTime){
                this.startTime=time+this.delay;
            }
            
            this.currentTime=time;
             this.timePassRatio=Math.max(Math.min((time-this.startTime)/this.duration,1),0);
            const realRatio=this.easing(this.timePassRatio);

            this.span.style.transform=`translateY(${realRatio*100}%)`

            if(this.timePassRatio<1){
                 this.currentAnimation=   requestAnimationFrame(this.animate.bind(this))
            }else{

                 this.reset();

            }
        
        },
        Start(){
            requestAnimationFrame(this.animate.bind(this));
        }

    }


}

class WordVisibleAnimation{

#current="backward";
#firstTime=true;
sentence="";

container=document.createElement("div");
words=[];
startAnimationHeightRatio; //getboundingclientrect.top/windowinnerheight ratio to start animation
easing;
duration;
delay;
currentTime;

constructor(sentence){

this.sentence=sentence;

const timeUpdate=(time)=>{
    this.currentTime=time;
    requestAnimationFrame(timeUpdate.bind(this));
}
requestAnimationFrame(timeUpdate.bind(this));
}


SetSentence(sentence){
    this.sentence=sentence;
}

setAnimationProperties(duration,delay,easing){

    this.delay=delay;
    this.duration=duration;
    this.easing=easing;
}

#ConvertSentenceToWords(sentence){

this.container.innerHTML=""; 
 this.words = [];
const arr=sentence.split(" ");

arr.forEach((element,index)=> {
    const spanContainer=document.createElement("div")
    spanContainer.style.display="inline-block"
    spanContainer.style.overflow="hidden"
    const span=document.createElement("span");
    span.style.display = "inline-block";
    span.style.transform="translateY(100%)"

    if(index<arr.length-1){
        span.textContent=element+" ";
    }else{
        span.textContent=element;
    }
    spanContainer.append(span);
    

    this.container.append(spanContainer);

    const word=new Word(spanContainer,span);
    word.setAnimationProperties(this.easing,this.duration)
    this.words.push(word);

});


}


Start(){

    this.#ConvertSentenceToWords(this.sentence);
    const checkCurrentPosition=()=>{
        const bou=this.container.getBoundingClientRect().top;
        const heightToAnimate=this.startAnimationHeightRatio*window.innerHeight;

        if(this.#firstTime){
        

            if(bou<heightToAnimate){
                
                   this.#firstTime=false;
                this.words.forEach((word,index)=>{

                    word.forwardAnimation.delay=this.delay*index;
                    word.forwardAnimation.Start();

                })
                 this.#current="forward";
            }


        }else{


            
            if(bou<heightToAnimate){

                if(this.#current=="backward"){
                    this.#current="forward";

                    const lastIndex=this.words.length-1;
                    let firstIndexStartTime=this.currentTime-this.duration-(lastIndex*this.delay);
            
                    for(let i=0;i<=lastIndex;i++){

                       cancelAnimationFrame(this.words[i].backwardAnimation.currentAnimation);
                       this.words[i].backwardAnimation.currentAnimation=undefined;

                       if(this.words[i].backwardAnimation.timePassRatio>0){

                         
                            const timePass=(1-this.words[i].backwardAnimation.timePassRatio) * this.duration;

                           firstIndexStartTime= this.currentTime - timePass - (i*this.delay);

                           break;

                          }

                    }


                    for(let i=0;i<=lastIndex;i++){

                        this.words[i].forwardAnimation.startTime= firstIndexStartTime + i*this.delay
                        this.words[i].forwardAnimation.Start();

                        this.words[i].backwardAnimation.reset();
                    }
                  
                }

                
                
                
            }else{


                if(this.#current=="forward"){
                    this.#current="backward";

                    const lastIndex=this.words.length-1;
                    let firstIndexStartTime=this.currentTime-this.duration;
            
                    for(let i=lastIndex;i>=0;i--){

                       cancelAnimationFrame(this.words[i].forwardAnimation.currentAnimation);
                       this.words[i].forwardAnimation.currentAnimation=undefined;

                       if(this.words[i].forwardAnimation.timePassRatio>0){

                         
                            const timePass=(1-this.words[i].forwardAnimation.timePassRatio) * this.duration;

                           firstIndexStartTime= this.currentTime - timePass + (i*this.delay);

                           break;

                          }

                    }


                    for(let i=0;i<=lastIndex;i++){

                        this.words[i].backwardAnimation.startTime= firstIndexStartTime - i*this.delay
                        this.words[i].backwardAnimation.Start();

                        this.words[i].forwardAnimation.reset();
                    }
            }
            
        }
            
    };
    }

    checkCurrentPosition();
    window.addEventListener("scroll",checkCurrentPosition.bind(this))

}


}


export {WordVisibleAnimation}