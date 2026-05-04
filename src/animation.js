/*
HELPFUL CLASSES ----------------------------------
DO NOT EXPORT THEM THEY ARE FOR INNER WORK
*/
class Property_{

    start;
    end;
    #currentValue=undefined;
    element;
    propertyName; // example: --translateY, --rotX
    propertySign; // example: px, %

    constructor(element,propertyName){

        this.element=element;
        this.propertyName=propertyName;
    }

    update(realRatio){

        this.#currentValue = this.start + realRatio*(this.end - this.start);
        this.element.style.setProperty(this.propertyName,`${this.#currentValue + this.propertySign}`);
    }

    getCurrentValue(){
        return this.#currentValue;
    }

}

class TimeDrivenAnimation_{

duration;
startTime;
#currentTime;
delay=0;
easing=function(x){return x;}
properties=[]; //Property class 

#activeAnimation=undefined;

constructor(){
}

    
#update(time){

    if(!this.startTime){
        this.startTime=time + this.delay;
    }
    this.#currentTime=time;

    const timePass=this.#currentTime-this.startTime;
    const timeRatio=Math.min(1,Math.max(timePass/this.duration,0));
    const realRatio=this.easing(timeRatio);

    this.properties.forEach(property=>{

        property.update(realRatio);
    })

    if(timeRatio < 1){
       this.#activeAnimation= requestAnimationFrame(this.#update.bind(this));
    }else{
        this.#activeAnimation=undefined;
    }
}

cancelActiveAnimation(){
    if(this.#activeAnimation){
        cancelAnimationFrame(this.#activeAnimation);
    }
    this.#activeAnimation=undefined;
}


getCurrentTime(){
    return this.#currentTime;
}

getTimePass(){
    return this.#currentTime - this.startTime;
}

start(){

    this.cancelActiveAnimation();
    this.#activeAnimation= requestAnimationFrame(this.#update.bind(this));

}

}



/*
MAIN CLASSES TO EXPORT ---------------------------------------------

scrolltriggeredanimation : started when scroll reach target value + updated by time progress

scrolldrivenanimation: started when scroll reach target value + updated by scroll progress
*/


class ScrollTriggeredAnimation {

scrollStart;
duration;
easing;
reverse=true; 


#currentState="not started" //example: "forward", "backward", "not started"
#animation=new TimeDrivenAnimation_();
#reverseAnimation=new TimeDrivenAnimation_();

constructor(){
 
}


addProperty({element,propertyName,propertySign,start,end}){

    const property = new Property_(element,propertyName)
    property.propertySign=propertySign;
    property.start=start;
    property.end=end;

    this.#animation.properties.push(property);

}

#checkScroll(){

    const scrollY=window.scrollY;

    if(this.#currentState=="not started"){

        if(scrollY>=this.scrollStart){

            this.#animation.start();
            this.#currentState="forward"
        }

    }else if(this.reverse){

        if(this.#currentState == "forward" && scrollY < this.scrollStart){

            this.#animation.cancelActiveAnimation();
            const timePassForReverse = this.duration - this.#animation.getTimePass();

            this.#reverseAnimation.delay =-timePassForReverse;
             this.#reverseAnimation.startTime=undefined

            this.#reverseAnimation.start();
            this.#currentState="backward"

        }else if(this.#currentState == "backward" && scrollY >=this.scrollStart){

            this.#reverseAnimation.cancelActiveAnimation();
            const timePass=this.duration - this.#reverseAnimation.getTimePass();

            this.#animation.delay=-timePass;
             this.#animation.startTime=undefined


            this.#animation.start();
            this.#currentState="forward"
        }


    }

}

//call when any property like scrollstart, duration, reverse etc changes to update animation
updateSettings(){
    
    this.#animation.easing=this.easing;
    this.#animation.duration=this.duration;


    if(this.reverse){

        this.#reverseAnimation.easing=(timeRatio)=>{
            return 1 - this.easing(1-timeRatio);
        }
        this.#reverseAnimation.duration=this.duration;

        this.#reverseAnimation.properties=[];

        this.#animation.properties.forEach(property=>{

            const prop = new Property_(property.element,property.propertyName);
            prop.propertySign=property.propertySign;
            prop.start=property.end;
            prop.end=property.start;

            this.#reverseAnimation.properties.push(prop);

        })

    }



    this.#checkScroll();
}


start(){

    this.updateSettings();
    window.addEventListener("scroll",this.#checkScroll.bind(this));

}


}



class ScrollDrivenAnimation{

startScroll;
endScroll;
easing=function(x){return x};
properties=[];
#throttle=true;

constructor(){


}

addProperty({element,propertyName,propertySign,start,end}){

    const property = new Property_(element,propertyName)
    property.propertySign=propertySign;
    property.start=start;
    property.end=end;

    this.properties.push(property);

}

#checkScroll(){
    
    const scroll=window.scrollY;

    let scrollRatio= (scroll - this.startScroll) / (this.endScroll-this.startScroll);
    scrollRatio =  Math.min(1,Math.max(0,scrollRatio));

    const realRatio = this.easing(scrollRatio);
    this.properties.forEach(property=>{

        property.update(realRatio);

    });



    this.#throttle=true;
    
}

updateSettings(){
    this.#checkScroll();

}
start(){

   
    window.addEventListener("scroll",()=>{

        if(this.#throttle){

            this.#throttle=false;

            requestAnimationFrame(this.#checkScroll.bind(this));

        }


    })

}

}
export { ScrollTriggeredAnimation, ScrollDrivenAnimation}