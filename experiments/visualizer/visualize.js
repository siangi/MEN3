

let audioCtx;
let analyser;
let simultTimeline;
let wildTimeline;
let flagTimeline;


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
    lettersRunningWild("dklfjakldasjdfööasfösddfaöfjsafsakfö");
    americanFlag(["god Bless USA", 
                "Vietnam War", 
                "Chicago Riots", 
                "The home of the brave", 
                "the land of the free",
                "The home of the brave",
                "the land of the free"], 0);
    simultTimeline.add(wildTimeline, 10);
    simultTimeline.add(flagTimeline, 0);
    // simultTimeline.add(crossingHorizontalLines("star spangled banner", 0), 10);
    // simultTimeline.add(createLoopForLetters("woodstock, 18.08.1968", 0), 10);
    console.log(simultTimeline.duration());
    updateVisualization();
}

function createSVGLetters(text, classes, reverseText = false){
    let visSVG = document.querySelector("#visualizer");
    let letters = text.split("");

    if (reverseText){
        letters = letters.reverse();
    }

    for (let idx = 0; idx < letters.length; idx++){
        let newLetter = `<text x="-20" y="-20" class="${classes}">${letters[idx]}</text>`
        visSVG.innerHTML += newLetter;   
    }
}

// creates the text letters and sends them running around the screen wildly
function lettersRunningWild(text){
    createSVGLetters(text, "visualizerText wildLetter");
    wildTimeline = gsap.timeline();

    let svg = document.querySelector("#visualizer");
    svgBounds = svg.viewBox.baseVal;
    letters = document.getElementsByClassName("wildLetters");
    console.log(svgBounds);

    wildTimeline.set(".wildLetter",
    {
        x: () => Math.round(svgBounds.width * Math.random()), 
        y: () => Math.round(svgBounds.height * Math.random()), 
    });
    repetitionTimeline = gsap.timeline({repeat: 100, repeatRefresh:true});
    repetitionTimeline.to(".wildLetter", 
    {
        x: () => Math.round(svgBounds.width * Math.random()), 
        y: () => Math.round(svgBounds.height * Math.random()), 
        duration: 0.5,  
        ease: "none"      
    });
    wildTimeline.add(repetitionTimeline);
    
    return wildTimeline;
}

function americanFlag(texts, secondsAt){
    const REPETITIONS = 3
    const DURATION = 10;
    flagTimeline = gsap.timeline();
    for (let lineIdx = 0; lineIdx < 7; lineIdx++){
        if (lineIdx % 2 == 1){
            createSVGLetters(texts[lineIdx], "visualizerText flagText whiteLine flagLine" + lineIdx, true);
        } else {
            createSVGLetters(texts[lineIdx], "visualizerText flagText redLine flagLine" + lineIdx);
        }        
    }

    let lines = document.getElementsByClassName("flagPath");
    console.log(lines);
    flagTimeline.to(".flagLine0",
        {
            motionPath:{
                path: lines[0],
                align: lines[0],
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
            
        }, secondsAt).then(function() { console.log("ended")});

    flagTimeline.to(".flagLine1",
        {
            motionPath:{
                path: lines[1],
                align: lines[1],
                alignOrigin: [0.5, 0.5],
                start: 1,
                end: 0,
            },
            stagger:{
                each: -0.75,
                repeat: REPETITIONS
            },
            duration: 10,
            ease: "none",
        }, secondsAt);

    flagTimeline.to(".flagLine2",
        {
            motionPath:{
                path: lines[2],
                align: lines[2],
                alignOrigin: [0.5, 0.5]
            },
            stagger:{
                each: -0.75,
                repeat: REPETITIONS
            },
            duration: 10,
            ease: "none",
        }, secondsAt);

    flagTimeline.to(".flagLine3",
        {
            motionPath:{
                path: lines[3],
                align: lines[3],
                alignOrigin: [0.5, 0.5],
                start: 1,
                end: 0,
            },
            stagger:{
                each: -0.45,
                repeat: REPETITIONS
            },
            duration: 10,
            ease: "none",
        }, secondsAt);

    flagTimeline.to(".flagLine4",
        {
            motionPath:{
                path: lines[4],
                align: lines[4],
                alignOrigin: [0.5, 0.5]
            },
            stagger:{
                each: -0.45,
                repeat: REPETITIONS
            },
            duration: 10,
            ease: "none",
        }, secondsAt);

    flagTimeline.to(".flagLine5",
        {
            motionPath:{
                path: lines[5],
                align: lines[5],
                alignOrigin: [0.5, 0.5],
                start: 1,
                end: 0,
            },
            stagger:{
                each: -0.45,
                repeat: REPETITIONS
            },
            duration: 10,
            ease: "none",
        }, secondsAt);
    
    flagTimeline.to(".flagLine6",
        {
            motionPath:{
                path: lines[6],
                align: lines[6],
                alignOrigin: [0.5, 0.5],
            },
            stagger:{
                each: -0.45,
                repeat: REPETITIONS
            },
            duration: 10,
            ease: "none",
        }, secondsAt);

    flagTimeline.to(".flagText", {opacity:0, duration: 2}, 10)
}

function crossingHorizontalLines(text, secondsAt){
    let linesTimeline = gsap.timeline();
    let lines = document.getElementsByClassName("calmLines");
    console.log(lines);
    
    createSVGLetters(text, "horizontalLineTop visualizerText");
    createSVGLetters(text, "horizontalLineBottom visualizerText");
   
    simultTimeline.to(".horizontalLineTop", 
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
        }, secondsAt);

    simultTimeline.to(".horizontalLineBottom", 
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
        }, secondsAt);
    
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
        }, secondsAt);
    
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