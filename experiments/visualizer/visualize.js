

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
    createLoopForLetters("star spangled banner")
}

function createLoopForLetters(text){
    let visSVG = document.querySelector("#visualizer");
    let offset = 1/text.length;
    let simultTimeline = gsap.timeline({repeat: -1});
    let letters = [];
    
    for (let idx = 0; idx < text.length; idx++){
        let newLetter = `<text x="200" y="200" id="letter${[idx]}" class="visualizerText">${text[idx]}</text>`
        visSVG.innerHTML += newLetter;
        letters.push(document.querySelector("#letter" + idx))    
    }
        console.log(letters);
        gsap.to(".visualizerText", 
        {
            duration: 30, 
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

function updateVisualization(){
    requestAnimationFrame(updateVisualization);
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    let scaleFact = scaleTo(dataArray[60], 128, 132, 1, 1.2)  
    gsap.to(".visualizerText", {scale: scaleFact, duration: 0.3}); 
}

function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}