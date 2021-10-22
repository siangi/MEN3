/*import { Chapter } from "./chapter.js";

window.addEventListener("DOMContentLoaded", (event) => {
    fetchChaptersJson();
});


function fetchChaptersJson(){
    const AllowCorsInit = {
        method: 'GET',
        mode: 'cors'
    }

    fetch("http://localhost:8080/chapters")
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            fillAllChapters(JSONtoObjects(data));
        });

}

function JSONtoObjects(jsonData){
    let chapters = new Array();

    jsonData.chapters.forEach(jsonChapter => {
        chapters.push(new Chapter(jsonChapter.title, jsonChapter.text, jsonChapter.year, 
            jsonChapter.backgroundcss, jsonChapter.soundpath));
    });
    console.log(chapters);
    return chapters;
}

function fillAllChapters(data){
    let chapters = document.getElementsByClassName("storywrapper");

    for (let i = 0; i < chapters.length; i++){
        if (i >= data.length){
            break;
        }

        fillHTMLChapter(chapters[i], data[i]);
    }
}

function fillHTMLChapter(storyWrapper, data) {
    storyWrapper.setAttribute('data-year', data.year);
    
    let storypartElement = storyWrapper.getElementsByClassName("storypart")[0];

    let audioTag = document.createElement("audio");
    audioTag.setAttribute("src", data.soundpath);
    storyWrapper.appendChild(audioTag);
    storyWrapper.style = data.backgroundCss;

    let titles = storypartElement.getElementsByTagName("h2");
    
    for (let title of titles){
        title.textContent = data.title;
    }

    let texts = storypartElement.getElementsByTagName("p");
    console.log(texts);
    for (let text of texts){
        text.textContent = data.text;
    }
}*/