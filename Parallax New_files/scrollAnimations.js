let yearDisplay = null;

window.addEventListener("load", (event) => {
  createObserverSlideIn();
  createObserverYearDisplay();
  createObserverFloatIn();
  createObserverAudio();
  createObserverStartLink();
});

// Element floats from Top to bottom or reversed
function floatInOnIntersect(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting){
      let sign = 1;

      if (entry.target.classList.contains("floatup")){
        sign = -1
      }
      
      console.log(window.innerHeight);
      entry.target.style.transform = "translate(0px, " + (window.innerHeight - entry.target.clientHeight)*sign*entry.intersectionRatio + "px)";
      entry.target.style.opacity = entry.intersectionRatio;  
    }
  })
}

// Element slides from left to right or reversed
function slideInOnIntersect(entries, observer) { 
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let sign = 1; //positive or negative (-1) sign to slide to left or right
  
      if (entry.target.classList.contains("slide-to-left")) {
        sign = -1;
      }

      entry.target.style.transform = "translate("+ entry.intersectionRatio * sign * 48 +"vw, 0%)";
      entry.target.style.opacity = entry.intersectionRatio;  
    }
  });
}

function setProperYear(entries, observer){
  entries.forEach(entry => {
    if (entry.intersectionRatio >= 0.8 && entry.target.dataset.year != null){
      yearDisplay.innerHTML = entry.target.dataset.year;  
    }
  })
}

function floatInOnTitleGone(entries, observer){
  entries.forEach(entry => {
      document.getElementById("totop").style.opacity = 1.0 - entry.intersectionRatio;
      console.log("totop" + " " + entry.intersectionRatio + " " + document.getElementById("totop").opacity)
  });
}

function startAudioOnIntersect(entries, observer){
  entries.forEach(entry => {
    let audioTags = entry.target.getElementsByTagName("audio");
    for (let element of audioTags){
      if (entry.intersectionRatio > 0.0 && element.paused){
        element.volume = 0.0;
        element.play();
      } else {
        element.pause();
      }
      
      element.volume = entry.intersectionRatio;
    }
  })
}

function createObserverSlideIn(){
  createStandardObserver(slideInOnIntersect, document.getElementsByClassName('slide-to-left'));
  createStandardObserver(slideInOnIntersect, document.getElementsByClassName('slide-to-right'));
}

function createObserverFloatIn(){
  createStandardObserver(floatInOnIntersect, document.getElementsByClassName("floatdown"));
  createStandardObserver(floatInOnIntersect, document.getElementsByClassName("floatup"));
}

function createObserverYearDisplay(){
  yearDisplay = document.getElementById("yeardisplay");
  
  createStandardObserver(setProperYear, document.getElementsByClassName("storywrapper"));
  createStandardObserver(setProperYear, document.getElementsByClassName("titlewrapper"));
}

function createObserverStartLink(){
  createStandardObserver(floatInOnTitleGone, document.getElementsByClassName("titlewrapper"));
}

function createObserverAudio(){
  createStandardObserver(startAudioOnIntersect, document.getElementsByClassName("storywrapper"));
}

function createStandardObserver(callbackFunc, targets) {
  let options = {
    root: null, //means viewport
    rootMargin: '0px',
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] 
  }

  let observer = new IntersectionObserver(callbackFunc, options);

  for (let target of targets){
    observer.observe(target);
  }
}

