

let audioCtx;
let analyser;
let simultTimeline;


window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    simultTimeline = gsap.timeline();
    createVisualizer();    
  });
  

function createVisualizer(){
    audioCtx = new AudioContext();
    let source = audioCtx.createMediaElementSource(document.querySelector('#performance'));
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 32;
    analyser.connect(audioCtx.destination);
    updateVisualization();

    MotionPathPlugin.convertToPath("#rectPath", true);
    createLoopForLetters("star spangled banner 18.08.69 Woodstock")
}

function createLoopForLetters(text){
    let visSVG = document.querySelector("#visualizer");
    let letters = [];
    
    for (let idx = 0; idx < text.length; idx++){
        let newLetter = `<text x="200" y="200" id="letter${[idx]}" class="visualizerText">${text[idx]}</text>`
        visSVG.innerHTML += newLetter;
        letters.push(document.querySelector("#letter" + idx))    
    }

    simultTimeline.to(".visualizerText", 
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
                repeat: -1
            },
            ease: "none",   
            repeat: -1
        }, 0);
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
    let scaleFact = scaleTo(dataArray[8], 115, 142, 0.6, 1.7)  
    if (dataArray[8] > 134){
        pulse();
        gsap.to(simultTimeline, {timeScale:2.5, duration: 0.7})
        // simultTimeline.timeScale(2.5)
    } else if (dataArray[8] <= 121){
        gsap.to(simultTimeline, {timeScale:1, duration: 0.7})
        // simultTimeline.timeScale(1);
    } else if (dataArray[8] <= 120){
        // gsap.to(simultTimeline, {timeScale:0.7, duration: 0.7})
        // simultTimeline.timeScale(0.75);
    }
    
    gsap.to(".visualizerText", {scale: scaleFact, duration: 0.3}); 
}

function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}