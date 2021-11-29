

let audioCtx;
let analyser;
let simultTimeline;


window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    simultTimeline = gsap.timeline();
    createVisualizer();    
  });

window.onclick = (event) =>{
    let video = document.querySelector("#performance");
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}
  

function createVisualizer(){
    audioCtx = new AudioContext();
    let source = audioCtx.createMediaElementSource(document.querySelector('#performance'));
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 32;
    analyser.connect(audioCtx.destination);
    updateVisualization();

    MotionPathPlugin.convertToPath(".calmLines", true);
    crossingHorizontalLines("star spangled banner 18.08.69 Woodstock")
}

function crossingHorizontalLines(text){
    let visSVG = document.querySelector("#visualizer");
    let lines = document.getElementsByClassName("calmLines");
    console.log(lines)
    for (let idx = 0; idx < lines.length; idx++){
        let textElement = `<text x="200" y="200" id="line${idx}" class="calmLineText visualizerText ">${text}</text>`
        visSVG.innerHTML += textElement;
        // elem = document.createTextNode(text);
        // elem.className = "visualizerText";
        // visSVG.append(elem);

        simultTimeline.to("#line" + idx, 
        { 
            motionPath:
            {
                path:lines[idx],
                align:lines[idx],
                alignOrigin: [0.5, 0.5],
            }, 
            duration: 10,
            ease: "none",   
            repeat: -1,
            yoyo: true
        }, 0);

    }
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
    let scaleFact = scaleTo(dataArray[8], 115, 142, 0.6, 2.5)  
    if (dataArray[8] > 134){
        pulse();
        gsap.to(simultTimeline, {timeScale:2.5, duration: 0.7})
    } else if (dataArray[8] <= 121){
        gsap.to(simultTimeline, {timeScale:1, duration: 0.7})      
    }
    
    gsap.to(".calmLineText", {scale: scaleFact, duration: 0.3}); 
}

function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}