let font;
// 2 dimensional array representing a word two draw
// 1 dimension = letters
// 2 dimension = points of the letter
let points;
let currentX = 0;
let currentY = 0;
let goalX = 200;
let goalY = 200;

function preload(){
  font = loadFont('arial.ttf');
}
function setup() {
  createCanvas(400, 400);
  noFill();

  
  console.log(points);
  frameRate(30);
}

function draw() {
    let line = 'WOODSTOCK';
    let previousLetterWidths = 0;
    let fontSize = 70;
    background(220);
    points = createWordPoints(line, currentX, currentY, fontSize);
    
    for (let letterIdx = 0; letterIdx < points.length; letterIdx++){
      beginShape();

      let letter = points[letterIdx];
      for(let pointIdx = 0; pointIdx < letter.length; pointIdx++){
        
        vertex(letter[pointIdx].x + previousLetterWidths*1.1, letter[pointIdx].y);
      }

      previousLetterWidths += font.textBounds(line[letterIdx], currentX, currentY, fontSize).w;
      currentX = lerp(currentX, goalX, 0.05);
      currentY = lerp(currentY, goalY, 0.05);
      endShape(CLOSE);    
    }
      
}

function createWordPoints(toDraw, startX, startY, size){
  let wordPoints = [];
  for (let idx = 0; idx < toDraw.length; idx++){
    wordPoints[idx] = font.textToPoints(toDraw[idx], startX, startY, size,
      {
        sampleFactor: 0.6, 
        simplifyThreshold: 0.1
      });
  }  

  return wordPoints;
}

function mouseClicked(){
  goalX = mouseX;
  goalY = mouseY;
}
