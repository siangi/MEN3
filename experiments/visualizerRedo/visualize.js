let baseTimeline;

window.addEventListener("load", (event) => {
    setUpAnimations();
})

function setUpAnimations(){
    baseTimeline = gsap.timeline();
    baseTimeline.add(setUpGreen(), 0);
    baseTimeline.add(setUpRed(), 10);
    baseTimeline.add(setUpBlue(), 25)
}

function setUpGreen(){
    let greenTimeline = gsap.timeline();
    greenTimeline.to(".green",
    {
        x: 100,
        duration: 2,
        repeat: 5,
        yoyo:true
    }, 0)

    return greenTimeline;
}

function setUpRed(){
    let redTimeline = gsap.timeline();
    redTimeline.to(".red",
    {
        x: 100,
        duration: 2,
        repeat: 5,
        yoyo:true
    }, 0);
    redTimeline.to(".red",
    {
        opacity: 0,
        duration: 5
    }, 10);

    return redTimeline;
}

function setUpBlue(){
    let blueTimeline = gsap.timeline();
    blueTimeline.to(".blue",
    {
        x: 200,
        duration: 3,
        repeat: 3,
        yoyo: true
    },0);

    return blueTimeline;
}