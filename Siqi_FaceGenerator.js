let hairColor;    // original haircolor 
let lastStep;     // how many steps
let starHighlight = false; // control eyes highlight
let happyMouth = false;    // control mouth shape

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("p5-face");   // ⭐ place canvas inside the HTML div
  hairColor = color('#F7B7B7'); 
  lastStep = 0;
}

function draw() {
  background('#FFE7C4'); //Face color
 
// x&y change //
  let faceSmall = map(mouseX, 0, width, 1, 0.5); 
  push();
  translate(width/2, height/2);   // center
  scale(faceSmall);               // zoom my face
  translate(-width/2, -height/2); 
  
 let scaleX = map(mouseX, 0, width, 1, 1.3); 
 let angle = map(mouseY, 0, height, -PI/2, PI/2);

push();
translate(width/2, height/2);  
scale(scaleX);                
rotate(angle);                
translate(-width/2, -height/2);

// bangs
  fill(hairColor);
  noStroke();
  rect(0, 0, 80, 40);
  rect(80, 0, 60, 40);
  rect(140, 0, 100, 40);
  rect(240, 0, 80, 40);
  rect(320, 0, 90, 40);

  rect(0, 40, 60, 40);
  rect(20, 40, 60, 40);
  rect(80, 40, 80, 40);
  rect(160, 40, 60, 40);
  rect(220, 40, 80, 40);
  rect(300, 40, 80, 40);
  rect(370, 40, 40, 40);

  rect(0, 80, 40, 90);
  rect(40, 80, 40, 40);
  rect(80, 80, 100, 70);
  rect(180, 80, 60, 55);
  rect(240, 80, 60, 80);
  rect(300, 80, 70, 50);
  rect(370, 80, 40, 90);

  rect(0, 170, 30, 90);
  rect(380, 170, 30, 90);

// eyes
  fill(0); 
  rect(100, 180, 40, 40);
  rect(260, 180, 40, 40);
  
  fill('#FFFFFF');
  noStroke();
  if (starHighlight) {
    star(110, 185, 3, 6, 5);
    star(270, 185, 3, 6, 5);
  } else {
    rect(100, 180, 10, 10);
    rect(260, 180, 10, 10);
  }

// cheek
  fill('#FCA8A8');
  blush(70, 262);
  blush(91, 262);
  blush(112, 262);
  blush(270, 262);
  blush(291, 262);
  blush(312, 262);

// mouth
  if (happyMouth) {
    fill('#F14242');
    noStroke();
    triangle(150, 280, 250, 280, 200, 330);
  } else {
    fill(0);
    rect(150, 280, 100, 20);
  }
}

// cheek function
function blush(x, y) {
  push();
  translate(x, y);
  quad(0, 0, 10, 0, 15, 30, 5, 30);
  pop();
}

// star highlight
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// hair color change
function mouseMoved() {
  let step = int(mouseX / 10);

  if (mouseX <= 10) {
    hairColor = color('#F7B7B7');
    lastStep = 0;
  } else if (step !== lastStep) {
    hairColor = color(random(100,255), random(100,255), random(100,255));
    lastStep = step;
  }
}

// mouth & eyes toggle
function mousePressed() {
  starHighlight = !starHighlight;
  happyMouth = !happyMouth;
}
