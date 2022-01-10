window.onload = () => {
    gsap.registerPlugin(ScrollTrigger)
    setupDeathSectAnimations();
    pinSectionTitle();
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

function pinSectionTitle(){
    ScrollTrigger.create({
        trigger: "#beginningSect",
        pin: ".subtitlePin",
        start: "top top",
        end: "bottom bottom"
    })
}