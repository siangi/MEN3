

let audioCtx;
let analyser;


window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    createVisualizer();
  });
  

function createVisualizer(){
    audioCtx = new AudioContext();
    let source = audioCtx.createMediaElementSource(document.querySelector('#performance'));
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 128;
    analyser.connect(audioCtx.destination);
    updateVisualization();

    MotionPathPlugin.convertToPath("#rectPath", true);
    createLoopForLetters("WOD")
}

function createLoopForLetters(text){
    let visSVG = document.querySelector("#visualizer");
    let offset = 1/text.length;
    let simultTimeline = gsap.timeline({repeat: -1});
    
    for (let idx = 0; idx < text.length; idx++){
        let newLetter = `<text x="10" y="10" id="letter${[idx]}" class="visualizerText">${text[idx]}</text>`
        visSVG.innerHTML += newLetter;
        simultTimeline.to("#letter" + idx, 
        {
            duration: 20, 
            motionPath:
            {
                path:"#rectPath",
                align:"#rectPath",
                autoRotate:true,
                alignOrigin: [0.5, 0.5],
                start: offset*idx
            }, 
            ease: "none"   

        }, 0);
        
    }
   
        simultTimeline.to("#letter0", 
        {
            duration: 20, 
            motionPath:
            {
                path:"#rectPath",
                align:"#rectPath",
                autoRotate:true,
                alignOrigin: [0.5, 0.5],
                start: 0
            }, 
            ease: "none"   

        }, 0);
        simultTimeline.to("#letter1", 
        {
            duration: 20, 
            motionPath:
            {
                path:"#rectPath",
                align:"#rectPath",
                autoRotate:true,
                alignOrigin: [0.5, 0.5],
                start: 0
            }, 
            ease: "none"   

        }, 0);
}

function updateVisualization(){
    requestAnimationFrame(updateVisualization);
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    let scaleFact = scaleTo(dataArray[60], 128, 132, 1, 1.2)  
    gsap.to("#w", {scale: scaleFact, duration: 0.1}); 
}

function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}