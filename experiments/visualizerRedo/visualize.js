let baseTimeline;

const flagLines = [
    "god Bless USA", 
    "Vietnam War", 
    "Chicago Riots", 
    "The home of the brave", 
    "the land of the free",
    "The home of the brave",
    "the land of the free"
]

window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    MotionPathPlugin.convertToPath("#testPath", true);
    MotionPathPlugin.convertToPath("#testPath2", true);
    setUpAnimations();
});

function setUpAnimations(){
    MotionPathPlugin.convertToPath(".calmLines", true);
    MotionPathPlugin.convertToPath("#rectPath", true);
    MotionPathPlugin.convertToPath(".flagPath", true);
    baseTimeline = gsap.timeline();
    gsap.registerPlugin(MotionPathPlugin);
    baseTimeline.add(setUpCrossingLines("testTextTestTextTestText"), 0);
    baseTimeline.add(setUpFlag(flagLines), 0);
}

function setUpCrossingLines(text){
    let linesTimeline = gsap.timeline();
    let lines = document.getElementsByClassName("calmLines");
    
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

    return linesTimeline;
}

function setUpFlag(textLines){
    const REPETITIONS = 3;
    const DURATION = 10;
    const LINE_COUNT = 7;
    let flagTimeline = gsap.timeline();
    for (let lineIdx = 0; lineIdx < 7; lineIdx++){
        if (lineIdx % 2 == 1){
            createSVGLetters(textLines[lineIdx], "visualizerText flagText whiteLine flagLine" + lineIdx, true);
        } else {
            createSVGLetters(textLines[lineIdx], "visualizerText flagText redLine flagLine" + lineIdx);
        }        
    }

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
                duration: DURATION,
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
                duration: DURATION,
                ease: "none",
                
            }, 0).then(function() { console.log("ended")});

        }
    }
    

    return flagTimeline;
}

function createSVGLetters(text, classes, reverseText = false){
    let visSVG = document.querySelector("#visualizer");
    let letters = text.split("");

    if (reverseText){
        letters = letters.reverse();
    }

    for (let idx = 0; idx < letters.length; idx++){
        // let newLetter = document.createElement("text");
        // newLetter.textContent  = letters[idx];
        // newLetter.setAttribute("x", "-20");
        // newLetter.setAttribute("y", "-20");
        // newLetter.setAttribute("class", classes)
        let newLetter = `<text x="-20" y="-20" class="${classes}">${letters[idx]}</text>`
        // visSVG.innerHTML += newLetter;   
        visSVG.insertAdjacentHTML('beforeend', newLetter);
    }
}

