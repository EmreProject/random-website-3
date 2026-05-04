const blinkh1=document.querySelector("div.down h1");
const blinkLine=document.querySelector("div.down .blink-line");



class WordAnimation{

words=[];
forwardEachLetterDuration;;
backwardEachLetterDuration;
delayToBackward;

currentDirection="forward";
currentWord=""
currentWordIndex=0;
isDelay=true;

previousTime=undefined;
currentTime=0;


constructor(forwardEachLetterDuration_=500, backwardEachLetterDuration__=300, delayToBackward_=1000){


this.forwardEachLetterDuration=forwardEachLetterDuration_;
this.backwardEachLetterDuration=backwardEachLetterDuration__;
this.delayToBackward=delayToBackward_;
}

addWord(word){
    this.words.push(word);
}

#animate(time){

if(!this.previousTime){
    this.previousTime=time;
}

const current=time;
const deltaTime=current-this.previousTime;
this.previousTime=time;

this.currentTime+=deltaTime;

let delay=0;
if(this.isDelay){
    delay+=this.delayToBackward;
}

if(this.currentDirection == "forward" && this.currentTime>this.forwardEachLetterDuration){

    this.currentTime=0;
    

    if(this.currentWord.length<this.words[this.currentWordIndex].length){

        this.currentWord = this.words[this.currentWordIndex].slice(0,this.currentWord.length+1);

    }else{

        this.currentDirection="backward";
        this.isDelay=true;


    }

    

}else if(this.currentDirection == "backward" && this.currentTime>this.backwardEachLetterDuration+delay){

    this.currentTime=0;
    this.isDelay=false;

    if(this.currentWord.length>0){

        this.currentWord = this.words[this.currentWordIndex].slice(0,this.currentWord.length-1);
    }else{

        this.currentDirection="forward";
        this.currentWordIndex = (this.currentWordIndex+1) % this.words.length;
    }


}

    blinkh1.textContent=this.currentWord;
    requestAnimationFrame(this.#animate.bind(this));

}

start(){

requestAnimationFrame(this.#animate.bind(this));

}

}

const wordAnim=new WordAnimation(250,150,500);
wordAnim.addWord("CREATIVE");
wordAnim.addWord("INNOVATIVE");
wordAnim.start();
