let font;
let points;

function preload(){
  font = loadFont('arial.ttf');
}
function setup() {
  createCanvas(400, 400);
  fill(0);
  points = font.textToPoints('JIMI', 100, 100, 30);
}

function draw() {
    background(220);
    beginShape();
    for (let idx = 0; idx < points.length; idx++){
        let p = points[idx];
        vertex(p.x, p.y);
        console.log("vertex");
    }
    endShape(LINES);  
}
