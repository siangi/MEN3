window.onload = () => {
    gsap.registerPlugin(ScrollTrigger)
    setupDeathSectAnimations();
}

// make this applicable for all
function setupDeathSectAnimations(){
    gsap.to(".section", {
        backgroundColor: "#000000",
        scrollTrigger: {
            trigger: "#deathSect",
            start: "top center",
            end: "top top",
            scrub: true
        },
    })
}