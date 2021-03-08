window.addEventListener("load", (event) => {
  createObserver();
});

function flyInOnIntersect(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      //entry.target.style.marginLeft = (entry.intersectionRatio * 49) + "%";
      entry.target.style.transform = "translate("+ entry.intersectionRatio * 48 +"vw, 0%)";
      entry.target.style.opacity = entry.intersectionRatio;  
    }
  });
}

function createObserver(){
  let options = {
    root: null, //means viewport
    rootMargin: '0px',
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] //if element halfway into view
  }
  
  let observer = new IntersectionObserver(flyInOnIntersect, options);
  
//  let target = document.querySelector('#flyin-1');
  let rightStories = document.getElementsByClassName('story-right');
  for (let target of rightStories){
    observer.observe(target);
  }

  
}

