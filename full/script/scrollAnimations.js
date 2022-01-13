let noiseElem;
let noiseVals =[];
backgroundColors = []

window.onload = () => {
    gsap.registerPlugin(ScrollTrigger)
    setupDeathSectAnimations();
    beginningSect();
    hendrixExperienceCover();
    hendrixExperienceSect();
    titleSection();
}

function titleSection(){
    const SUBTITLE_TIME = 4;
    titleTimeline = gsap.timeline;
    subtitles = document.querySelectorAll("#chapterOverview h2");
    titleTimeline = gsap.timeline();

    for(let i = 0; i < subtitles.length; i++){
        titleTimeline.from(subtitles[i],
            {
                x: "100vw",
                duration: 1,
                onStart: () => { subtitles[i].style.display = "block"}
            }, i*SUBTITLE_TIME);
        
        titleTimeline.to(subtitles[i],
            {
                x: "-100vw",
                duration: 1,
                onComplete: () => { subtitles[i].style.display = "none"}
            }, (i+1)*SUBTITLE_TIME)
    }
    titleTimeline.repeat(-1);
    titleTimeline.play();
}

function setupDeathSectAnimations(){
    gsap.to(".section", {
        backgroundColor: "#F4F3AA",
        scrollTrigger: {
            trigger: "#beginningSect",
            start: "top center",
            end: "top top",
            scrub: true
        },
    });

    gsap.to(".section", {
        backgroundColor: "#EECB00",
        scrollTrigger: {
            trigger: "#hendrixExperienceAnimation",
            start: "top center",
            end: "top top",
            scrub: true
        },
    });

    gsap.to(".section", {
        backgroundColor: "#474747",
        scrollTrigger: {
            trigger: "#woodstockPerformance",
            start: "top center",
            end: "top top",
            scrub: true
        },
    });

    gsap.to(".section", {
        backgroundColor: "#0F090F",
        scrollTrigger: {
            trigger: "#downfall",
            start: "top center",
            end: "top top",
            scrub: true
        },
    });

    gsap.to(".section", {
        backgroundColor: "#000000",
        scrollTrigger: {
            trigger: "#deathSect",
            start: "top center",
            end: "top top",
            scrub: true
        },
    });
}

function beginningSect(){
    ScrollTrigger.create({
        trigger: "#beginningSect",
        pin: ".subtitlePin",
        start: "top top",
        end: "bottom center"});

    leftColumnElems = document.querySelectorAll("#beginningSect .leftColumn img, #beginningSect .leftColumn iframe");
    rightColumnElems = document.querySelectorAll("#beginningSect .rightColumn img, #beginningSect .rightColumn iframe");

    for(let i = 0; i < leftColumnElems.length; i++){
        gsap.from(leftColumnElems[i],{
            x: "-50",
            transform: "rotate(-5deg)",
            duration: 0.5,
            scrollTrigger:{ 
                trigger: leftColumnElems[i],
                start: "top 90%",
                end: "bottom center"
            }
        })
    }
    
    for(let i = 0; i < rightColumnElems.length; i++){
        gsap.from(rightColumnElems[i],{
            x: "50",
            transform: "rotate(5deg)",
            duration: 0.15,
            scrollTrigger:{ 
                trigger: rightColumnElems[i],
                start: "top 90%"
            }
        })
    }
    
    gsap.to(".scrollImg",{
        y: "2vh",
        duration: 1.2,
        yoyo: true,
        repeat: -1
    })
}

function hendrixExperienceSect(){
    leftColumnElems = document.querySelectorAll("#hendrixExperience .leftColumn img, #hendrixExperience .leftColumn iframe");
    rightColumnElems = document.querySelectorAll("#hendrixExperience .rightColumn img, #hendrixExperience .rightColumn iframe");

    for(let i = 0; i < leftColumnElems.length; i++){
        gsap.from(leftColumnElems[i],{
            transform: "scale(0.9)",
            duration: 0.5,
            scrollTrigger:{ 
                trigger: leftColumnElems[i],
                start: "top 95%",
                end: "bottom center"
            }
        })
    }
    
    for(let i = 0; i < rightColumnElems.length; i++){
        gsap.from(rightColumnElems[i],{
            transform: "scale(0.9)",
            duration: 0.15,
            scrollTrigger:{ 
                trigger: rightColumnElems[i],
                start: "top 95%"
            }
        })
    }
}

function hendrixExperienceCover(){
    noiseElem = document.getElementById("noise");
    noiseVals = [0.0, 0.0];
    

    starsTimeline = gsap.timeline();
    starsTimeline.to("#star1, #star2", {transformOrigin: "center center"})
    starsTimeline.to("#star1", 
    {
        rotation: "360",
        duration: 20,
        ease: "none",
        repeat: -1
    }, 0);

    starsTimeline.to("#star2", 
    {
        rotation: "-360",
        duration: 20,
        ease: "none",
        repeat: -1
    }, 0);

    starsTimeline.to("#star1",
    {
        scale: (1.4, 1.4),
        duration: 2,
        yoyo: true,
        repeat: -1
    }, 0);

    starsTimeline.to("#noiseTurbulence",
    {
        duration: 5,
        attr:{ baseFrequency:"0.015" },
        scrollTrigger: {
            trigger: "#hendrixExperienceAnimation",
            start: "top center",
            end: "bottom center"
        },
        yoyo: true,
        repeat: -1,
        repeatDelay: 3
    },0);
}

function setNewNoiseAttrib(){
    noiseElem.setAttribute("baseFrequency", noiseVals[0] + " " + noiseVals[1]);
    noiseVals[0] = Math.random() * 0.4;
    noiseVals[1] = Math.random() * 0.4;
}

function updateFilterFunc(selector){
    if (typeof(selector) === "string") { 
        e = document.querySelector(selector);
    }

    var filter = getComputedStyle(e).filter;
    return function() {
        e.style.transform = "translateZ(0)";
        e.style.filter = filter;
    }
}