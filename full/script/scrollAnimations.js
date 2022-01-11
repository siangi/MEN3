window.onload = () => {
    gsap.registerPlugin(ScrollTrigger)
    setupDeathSectAnimations();
    pinSectionTitle();
    starAnimations();
}

function setupDeathSectAnimations(){
    gsap.to(".section", {
        backgroundColor: "#000000",
        scrollTrigger: {
            trigger: "#deathSect",
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
}

function pinSectionTitle(){
    ScrollTrigger.create({
        trigger: "#beginningSect",
        pin: ".subtitlePin",
        start: "top top",
        end: "bottom bottom"
    })
}

function starAnimations(){
    starsTimeline = gsap.timeline();
    starsTimeline.to("#star1, #star2", {transformOrigin: "center center"})
    starsTimeline.to("#star1", 
    {
        rotation: "360",
        duration: 8,
        ease: "none",
        repeat: -1
    }, 0);

    starsTimeline.to("#star2", 
    {
        rotation: "-360",
        duration: 8,
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

    starsTimeline.to("#star2",
    {
        scale: (1.0, 1.0),
        duration: 2,
        yoyo: true,
        repeat: -1
    }, 0)
    // transform origin stimmt irgendwie noch nicht!!??
    // starsTimeline.pause();
}