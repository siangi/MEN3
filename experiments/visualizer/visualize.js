let audioCtx;
let analyser;
let simultTimeline;

window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    simultTimeline = gsap.timeline();
    simultTimeline.pause();
    createVisualizer();    
  });

window.onclick = (event) =>{
    let video = document.querySelector("#performance");
    if(video.paused){
        video.play();
        simultTimeline.play();
    } else {
        video.pause();
        simultTimeline.pause();
    }
}  

function createVisualizer(){
    audioCtx = new AudioContext();
    let source = audioCtx.createMediaElementSource(document.querySelector('#performance'));
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 32;
    analyser.connect(audioCtx.destination);
    

    MotionPathPlugin.convertToPath(".calmLines", true);
    MotionPathPlugin.convertToPath("#rectPath", true);
    MotionPathPlugin.convertToPath(".flagPath", true);
  
    simultTimeline.add(crossingHorizontalLines("star spangled banner", 35), 0);
    simultTimeline.add(americanFlag(["god Bless USA", 
    "Vietnam War", 
    "Chicago Riots", 
    "The home of the brave", 
    "the land of the free",
    "The home of the brave",
    "the land of the free"], 30), 35);
    simultTimeline.add(lettersRunningWild("Vietnam WarChicagoRiotsThehomeofthelandoffree", 30), 65);
    
    // simultTimeline.add(createLoopForLetters("woodstock, 18.08.1968", 0), 10);
    // updateVisualization();
}

function createSVGLetters(text, classes, reverseText = false){
    let visSVG = document.querySelector("#visualizer");
    let letters = text.split("");

    if (reverseText){
        letters = letters.reverse();
    }

    for (let idx = 0; idx < letters.length; idx++){
        let newLetter = `<text x="-20" y="-20" class="${classes}">${letters[idx]}</text>`
        visSVG.insertAdjacentHTML('beforeend', newLetter);   
    }
}

// creates the text letters and sends them running around the screen wildly
function lettersRunningWild(text, duration){
    createSVGLetters(text, "visualizerText wildLetter");
    let wildTimeline = gsap.timeline();

    let svg = document.querySelector("#visualizer");
    svgBounds = svg.viewBox.baseVal;
    letters = document.getElementsByClassName("wildLetters");
    console.log(svgBounds);

    // wildTimeline.set(".wildLetter",
    // {
    //     x: () => Math.round(svgBounds.width * Math.random()), 
    //     y: () => Math.round(svgBounds.height * Math.random()), 
    // });
    repetitionTimeline = gsap.timeline({repeat: 100, repeatRefresh:true});
    repetitionTimeline.to(".flagText", 
    {
        x: () => Math.round(window.innerWidth * Math.random() * 0.2), 
        y: () => Math.round(window.innerHeight * Math.random()* 0.2), 
        duration: 0.5,  
        ease: "none"      
    });
    wildTimeline.add(repetitionTimeline);
    wildTimeline.to(".flagText", {opacity:0, duration: 2, onComplete:function () {wildTimeline.pause()}}, duration)
    return wildTimeline;
}

function americanFlag(texts, duration){
    const REPETITIONS = 3;
    const LINE_COUNT = 7;

    let flagTimeline = gsap.timeline();
    for (let lineIdx = 0; lineIdx < 7; lineIdx++){
        if (lineIdx % 2 == 1){
            createSVGLetters(texts[lineIdx], "visualizerText flagText whiteLine flagLine" + lineIdx, true);
        } else {
            createSVGLetters(texts[lineIdx], "visualizerText flagText redLine flagLine" + lineIdx);
        }        
    }

    let index = 0;
    let lines = document.getElementsByClassName("flagPath");
    for(let index = 0; index < LINE_COUNT; index++){
        if (index % 2 == 1){
            flagTimeline.to(".flagLine" + index,
            {
                
                motionPath:{
                    path: lines[index],
                    align: lines[index],
                    alignOrigin: [0.5, 0.5],
                    start: 1,
                    end: 0
                },
                stagger:{
                    each: -0.75,
                    repeat: REPETITIONS,
                    end: function() {             
                        console.log("ended stagger")
                    }
                },
                duration: 10,
                ease: "none",
                
            }, 0).then(function() { console.log("ended")});
        } 
        else {
            flagTimeline.to(".flagLine" + index,
            {
                
                motionPath:{
                    path: lines[index],
                    align: lines[index],
                    alignOrigin: [0.5, 0.5]
                },
                stagger:{
                    each: -0.75,
                    repeat: REPETITIONS,
                    end: function() {             
                        console.log("ended stagger")
                    }
                },
                duration: 10,
                ease: "none",
                
            }, 0).then(function() { console.log("ended")});

        }
    }

    // after the duration we want, make the letters invisible and stop the timeline, since it is hard to 
    // control with the stagger.
    flagTimeline.to(".flagText", {opacity:1, duration: 0.5, onComplete:function () {flagTimeline.pause()}}, duration)
     
    return flagTimeline;
}

function crossingHorizontalLines(text, duration){
    let linesTimeline = gsap.timeline();
    let lines = document.getElementsByClassName("calmLines");
    console.log(lines);
    
    createSVGLetters(text, "horizontalLineTop visualizerText");
    createSVGLetters(text, "horizontalLineBottom visualizerText");
   
    linesTimeline.to(".horizontalLineTop", 
        { 
            motionPath:
            {
                path: lines[0],
                align: lines[0],
                alignOrigin: [0.5, 0.0],
            }, 
            stagger:{
                each: -0.45,
                repeat: 3
            },
            duration: 10,
            ease: "none",   
        }, 0);

    linesTimeline.to(".horizontalLineBottom", 
        { 
            motionPath:
            {
                path: lines[1],
                align: lines[1],
                alignOrigin: [0.5, 1.0],
            }, 
            stagger:{
                each: -0.45,
                repeat: 3
            },
            duration: 10,
            ease: "none",   
        }, 0);
    
    linesTimeline.to(".horizontalLineTop", {opacity:0, duration: 2, onComplete:function () {linesTimeline.pause()}}, duration);
    linesTimeline.to(".horizontalLineBottom", {opacity:0, duration: 2, onComplete:function () {linesTimeline.pause()}}, duration);
    
    return linesTimeline;
}
   

function createLoopForLetters(text, secondsAt){
    let loopTimeline = gsap.timeline();
    
    createSVGLetters(text, "letterLoop visualizerText");

    loopTimeline.to(".letterLoop", 
        {
            duration: 25, 
            motionPath:
            {
                path:"#rectPath",
                align:"#rectPath",
                autoRotate:true,
                alignOrigin: [0.5, 0.5],
            }, 
            stagger:{
                each: -0.6,
            },
            ease: "none",   
        }, 0);
    
    return loopTimeline;
}

function pulse(){
    let pulsetl = gsap.timeline();
    pulsetl.fromTo("#performance", {boxShadow: "0px 0px 3vw 0px rgba(245,183,39,0.1)"}, 
        {boxShadow: "0px 0px 3vw 5vw rgba(245,183,39,0.05)", duration: 0.7, ease:"expo"})
    pulsetl.to("#performance", {boxShadow: "0px 0px 3vw 5vw rgba(245,183,39,0)", duration: 0.7, ease:"none"}, )
}

function updateVisualization(){
    requestAnimationFrame(updateVisualization);
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    let scaleFact = scaleTo(dataArray[8], 115, 142, 0.7, 1.3)  
        
    gsap.to(".visualizerText", {scale: scaleFact, duration: 0.3}); 
}

// replace with mapRange from gsap
function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}