let audioCtx;
let analyser;

window.addEventListener("load", (event) => {
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
}

function updateVisualization(){
    requestAnimationFrame(updateVisualization);
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    console.log(dataArray[60] + " " + dataArray[20] + " " + dataArray[0]);
    let scaleFact = scaleTo(dataArray[60], 128, 132, -0.1, 0.1)
    gsap.to(".visualizerText", {x: "+=" + scaleFact + "%", duration: 0.1} );    
}

function setFontSizeByLoudness(loudness){
    let element = document.querySelector(".visualizerText");
    
    element.style.setProperty("--size", scale(loudness, 100, 140, 2, 3) + "em");
}

function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}