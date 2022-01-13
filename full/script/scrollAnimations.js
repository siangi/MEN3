let noiseElem;
let noiseVals =[];

window.onload = () => {
    gsap.registerPlugin(ScrollTrigger)
    setupDeathSectAnimations();
    pinSectionTitle();
    starAnimations();
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

function pinSectionTitle(){
    ScrollTrigger.create({
        trigger: "#beginningSect",
        pin: ".subtitlePin",
        start: "top top",
        end: "bottom center"
    })
}

function starAnimations(){
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