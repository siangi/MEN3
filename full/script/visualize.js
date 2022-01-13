let audioCtx;
let analyser;
let simultTimeline;


window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    simultTimeline = gsap.timeline();
    simultTimeline.pause();
    createVisualizer();    
    introStart();
});

// if you click anywhere on the start screen, move the start screen upwards
// animate the playButton to scale a bit so people will click.
function introStart(){
    gsap.to("#playBtn",
    {
        scale: 1.1,
        duration: 1.5,
        yoyo: true,
        repeat: -1
    });

    title = document.querySelector("#woodstockIntro");
    screen = document.querySelector("#woodstockIntro");
    console.log(title);
    title.onclick = (event)=> {
        gsap.to("#woodstockIntro", {
            y: "-100vh",
            opacity: "0",
            duration: 2,
            onComplete: () =>{
                let elem = document.getElementById("woodstockIntro");
                elem.display = "none";
            }
        })
    }
}

// move the images at the start of the video through the screen
function createGalleryTimeline(){
    const IMAGE_LOOKAT_TIME = 6;
    images = document.querySelectorAll(".introImg");
    galleryTimeline = gsap.timeline();
    for(let i = 0; i < images.length; i++){
        galleryTimeline.from(images[i],
            {
                y: "100vh",
                duration: 1.5,
                onStart: () => { images[i].style.display = "block" }
            }, i*IMAGE_LOOKAT_TIME)
        galleryTimeline.to(images[i], {
            y: "-100vh",
            duration: 1.5,
            // set the display property so the other pictures won't disturb the placement and arent visible
            onComplete: () => { images[i].style.display = "none" }
        }, (i+1)*IMAGE_LOOKAT_TIME)
    }

    return galleryTimeline;
}

function createVisualizer(){
    // FFT analyzer currently not in use, would make the letters scale with the
    // loudness. 
    // initializeFFtAnalyser();
    initializeControls();

    // <line> tags have to be converted to paths, or gsap will not recognize them
    MotionPathPlugin.convertToPath(".calmLines", true);
    MotionPathPlugin.convertToPath("#rectPath", true);
    MotionPathPlugin.convertToPath(".flagPath", true);
    
    // create each part of the visualization and insert them at the right time.
    simultTimeline.add(createGalleryTimeline(), 0);
    simultTimeline.add(horizontalLines(["jimi hendrix","star spangled banner"], 5), 30);
    simultTimeline.add(americanFlag(["god Bless USA", 
    "Vietnam War", 
    "Chicago Riots", 
    "The home of the brave", 
    "the land of the free",
    "The home of the brave",
    "the land of the free"], 30), 35);
    simultTimeline.add(lettersRunningWild("Vietnam WarChicagoRiotsThehomeofthelandoffree", 30), 65);
    
    // scaleToLoudness();
}

function initializeControls(){
    let section = document.getElementById("woodstockPerformance");
    if(section == null){
        console.error("section for Woodstockperformance not found!");
        return;
    }

    section.onclick = (event) =>{
        togglePlay();
    }  
}

// the timeline needs to be stopped too, so the visualization and video
// dont go out of sync.
function togglePlay(){
    let video = document.querySelector("#performance");
    if(video.paused){
        video.play();
        simultTimeline.play();
    } else {
        video.pause();
        simultTimeline.pause();
    }
}

// create audio analyzer to react to the loudness of certain channels.
function initializeFFtAnalyser(){
    audioCtx = new AudioContext();
    let source = audioCtx.createMediaElementSource(document.querySelector('#performance'));
    analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 32;
    analyser.connect(audioCtx.destination);

    return analyser
}

/// takes string, creates single svg text elements, to be animated indvidually
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

// animates letters to a random location inside the svg bounds
function lettersRunningWild(text, duration){
    createSVGLetters(text, "visualizerText wildLetter");
    let wildTimeline = gsap.timeline();

    let svg = document.querySelector("#visualizer");
    svgBounds = svg.viewBox.baseVal;
    letters = document.getElementsByClassName("wildLetters");
    console.log(svgBounds);

    repetitionTimeline = gsap.timeline({repeat: 100, repeatRefresh:true});
    repetitionTimeline.to(".flagText", 
    {
        x: () => Math.round(window.innerWidth * Math.random() * 0.2), 
        y: () => Math.round(window.innerHeight * Math.random()* 0.2), 
        duration: 0.5,  
        ease: "none"      
    });
    wildTimeline.add(repetitionTimeline);
    // it is hard to control the exact timing, so we just stop at a given second
    wildTimeline.to(".flagText", {opacity:0, duration: 2, onComplete:function () {wildTimeline.pause()}}, duration)
    return wildTimeline;
}

// make letters float across the screen in red and white lines, thus simulating an
// american Flag
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



function horizontalLines(text, duration){
    let linesTimeline = gsap.timeline();
    let lines = document.getElementsByClassName("calmLines");
    console.log(lines);
    
    createSVGLetters(text[0], "horizontalLineTop visualizerText");
    createSVGLetters(text[1], "horizontalLineBottom visualizerText");
   
    linesTimeline.to(".horizontalLineTop", 
        { 
            motionPath:
            {
                path: lines[0],
                align: lines[0],
                alignOrigin: [0.5, 0.0],
            }, 
            stagger:{
                each: -0.25,
                repeat: 0
            },
            duration: duration,
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
                each: -0.25,
                repeat: 0
            },
            duration: duration,
            ease: "none",   
        }, 0);
    

    //make letters disappear after duration, because the actual duration is hard
    // to calculate with the gsap-stagggers.
    linesTimeline.to(".horizontalLineTop", {opacity:0, duration: 2, onComplete:function () {linesTimeline.pause()}}, duration);
    linesTimeline.to(".horizontalLineBottom", {opacity:0, duration: 2, onComplete:function () {linesTimeline.pause()}}, duration);
    
    return linesTimeline;
}

// scale all Letters on screen according to current loudness from fftAnalyser
function scaleToLoudness(){
    requestAnimationFrame(scaleToLoudness);
    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(dataArray);
    let scaleFact = scaleTo(dataArray[8], 115, 142, 0.7, 1.3)  
        
    gsap.to(".visualizerText", {scale: scaleFact, duration: 0.3}); 
}

// replace with mapRange from gsap
function scaleTo (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}