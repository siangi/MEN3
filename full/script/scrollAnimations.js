let noiseElem;
let noiseVals = [];
backgroundColors = [];

window.onload = () => {
  gsap.registerPlugin(ScrollTrigger);
  backgroundAnimation();
  beginningSect();
  hendrixExperienceCover();
  hendrixExperienceSect();
  titleSection();
  scrollImages();
};

// animate the categories on the titlescreen
function titleSection() {
  const SUBTITLE_TIME = 4;
  titleTimeline = gsap.timeline;
  subtitles = document.querySelectorAll("#chapterOverview h2");
  titleTimeline = gsap.timeline();

  for (let i = 0; i < subtitles.length; i++) {
    // float in at right time. we set the display value os the others arent visible.
    titleTimeline.from(
      subtitles[i],
      {
        x: "100vw",
        duration: 1,
        onStart: () => {
          subtitles[i].style.display = "block";
        },
      },
      i * SUBTITLE_TIME
    );

    // float out
    titleTimeline.to(
      subtitles[i],
      {
        x: "-100vw",
        duration: 1,
        onComplete: () => {
          subtitles[i].style.display = "none";
        },
      },
      (i + 1) * SUBTITLE_TIME
    );
  }
  titleTimeline.repeat(-1);
}

/* set the bodys backgroundColor to the current section color
makes for smooth transitions between sections*/
function backgroundAnimation() {
  gsap.to("body", {
    backgroundColor: "#F4F3AA",
    scrollTrigger: {
      trigger: "#titleSect",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });

  gsap.to("body", {
    backgroundColor: "#EECB00",
    scrollTrigger: {
      trigger: "#hendrixExperienceAnimation",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });

  gsap.to("body", {
    backgroundColor: "#0F090F",
    scrollTrigger: {
      trigger: "#woodstockPerformance",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });

  gsap.to("body", {
    backgroundColor: "#0F090F",
    scrollTrigger: {
      trigger: "#downfall",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });

  gsap.to("body", {
    backgroundColor: "#000000",
    scrollTrigger: {
      trigger: "#deathSect",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });
}

// make the guitar bounce to motivate scorlling
function scrollImages() {
  gsap.to(".scrollImg", {
    y: "2vh",
    duration: 1.2,
    yoyo: true,
    repeat: -1,
  });
}

// tilt all the pictures in the section on left and right side towards middle
function beginningSect() {
  ScrollTrigger.create({
    trigger: "#beginningSect",
    pin: ".subtitlePin",
    start: "top top",
    end: "bottom 50%",
  });

  leftColumnElems = document.querySelectorAll(
    "#beginningSect .leftColumn img, #beginningSect .leftColumn iframe"
  );
  rightColumnElems = document.querySelectorAll(
    "#beginningSect .rightColumn img, #beginningSect .rightColumn iframe"
  );

  for (let i = 0; i < leftColumnElems.length; i++) {
    gsap.from(leftColumnElems[i], {
      x: "-50",
      transform: "rotate(-5deg)",
      duration: 0.5,
      scrollTrigger: {
        trigger: leftColumnElems[i],
        start: "top 90%",
        end: "bottom center",
      },
    });
  }

  for (let i = 0; i < rightColumnElems.length; i++) {
    gsap.from(rightColumnElems[i], {
      x: "50",
      transform: "rotate(5deg)",
      duration: 0.15,
      scrollTrigger: {
        trigger: rightColumnElems[i],
        start: "top 90%",
      },
    });
  }
}

// the images in the left and right column get larger as they are scrolled into view.
function hendrixExperienceSect() {
  leftColumnElems = document.querySelectorAll(
    "#hendrixExperience .leftColumn img, #hendrixExperience .leftColumn iframe"
  );
  rightColumnElems = document.querySelectorAll(
    "#hendrixExperience .rightColumn img, #hendrixExperience .rightColumn iframe"
  );

  for (let i = 0; i < leftColumnElems.length; i++) {
    gsap.from(leftColumnElems[i], {
      transform: "scale(0.9)",
      duration: 0.5,
      scrollTrigger: {
        trigger: leftColumnElems[i],
        start: "top 95%",
      },
    });
  }

  for (let i = 0; i < rightColumnElems.length; i++) {
    gsap.from(rightColumnElems[i], {
      transform: "scale(0.9)",
      duration: 0.15,
      scrollTrigger: {
        trigger: rightColumnElems[i],
        start: "top 95%",
      },
    });
  }
}

// on the title cover of the hendrix Experience section,
// change up the base values of the noise to make a fluid effect.
// only do this for a short time and when in view, since it is extremeley resource
// intensive
// also make the background stars rotate and scale in size
function hendrixExperienceCover() {
  noiseElem = document.getElementById("noise");
  noiseVals = [0.0, 0.0];

  starsTimeline = gsap.timeline();
  starsTimeline.to("#star1, #star2", { transformOrigin: "center center" });
  starsTimeline.to(
    "#star1",
    {
      rotation: "360",
      duration: 20,
      ease: "none",
      repeat: -1,
    },
    0
  );

  starsTimeline.to(
    "#star2",
    {
      rotation: "-360",
      duration: 20,
      ease: "none",
      repeat: -1,
    },
    0
  );

  starsTimeline.to(
    "#star1",
    {
      scale: (1.4, 1.4),
      duration: 2,
      yoyo: true,
      repeat: -1,
    },
    0
  );

  starsTimeline.to(
    "#noiseTurbulence",
    {
      duration: 5,
      attr: { baseFrequency: "0.015" },
      scrollTrigger: {
        trigger: "#hendrixExperienceAnimation",
        start: "top center",
        end: "bottom center",
      },
      yoyo: true,
      repeat: -1,
      repeatDelay: 3,
    },
    0
  );
}
