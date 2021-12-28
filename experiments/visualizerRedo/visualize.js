let baseTimeline;

window.addEventListener("load", (event) => {
    gsap.registerPlugin(MotionPathPlugin);
    MotionPathPlugin.convertToPath("#testPath", true);
    MotionPathPlugin.convertToPath("#testPath2", true);
    setUpAnimations();
});

function setUpAnimations(){
    baseTimeline = gsap.timeline();
    baseTimeline.add(setUpGreen(), 0);
    baseTimeline.add(setUpRed(), 10);
    baseTimeline.add(setUpBlue(), 25);
    baseTimeline.add(setUpViolet(), 5);
    baseTimeline.add(setUpSVGRect(), 5)
}

function setUpGreen(){
    let greenTimeline = gsap.timeline();
    greenTimeline.to(".green",
    {
        motionPath: {
            path:"#testPath",
            align:"#testPath",
            
        },
        duration: 8,
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

function setUpViolet(){
    let violetTimeline = gsap.timeline();

    violetTimeline.to(".violet", {
        motionPath: {
            path:"#testPath2",
            align:"#testPath2",
        },
        stagger: 0.1,
        duration: 5,
        yoyo: true,
        repeat: 8
    });
    
    return violetTimeline;
}

function setUpSVGRect(){
    let svgTimeline = gsap.timeline();

    svgTimeline.to(".svgRect", {
        motionPath: {
            path:"#testPath2",
            align:"#testPath2",
        },
        stagger: 0.1,
        duration: 5,
        yoyo: true,
        repeat: 8
    })
}