let menuOpen = true;
window.addEventListener("load", (event) => {
    toggleMenu(); 
});


function toggleMenu(){
    let menu = document.getElementById("menuItems") ;
    let menubtn = document.getElementById("menubtn");
    if (menuOpen){
        menu.style.transform = "translate(" +  menu.offsetWidth + "px,0px)";
        menubtn.style.transform = "rotate(180deg)";
    } else {
        menu.style.transform = "";
        menubtn.style.transform = "";
    }

    

    menuOpen = !menuOpen;
}