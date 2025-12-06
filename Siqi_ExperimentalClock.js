let colorsSquares = [];
let falling = false;
let fallY = 0;
let bgImg;

function preload() {
  bgImg = loadImage("image/glitch.jpg"); // ⭐ 一定要有 image/
}

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.parent("p5-clock");   // ⭐ 画布放进 id="p5-clock" 的 div

  noFill();
  rectMode(CENTER);

  // color of the square
  for (let i = 0; i < 12; i++) {
    colorsSquares.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  // set-bg image //
  imageMode(CORNER);
  tint(255, 204);  // 80%
  image(bgImg, 0, 0, width, height);

  // wind wiggle //
  const swayAmp = PI / 24;
  const swaySpeed = 0.02;
  let theta;

  if (falling) {
    theta = 0;
  } else {
    theta = sin(frameCount * swaySpeed) * swayAmp;
  }

  // dandelion stem //
  drawStem(theta);

  if (falling) {
    fallY += 5;
  }

  push();
  translate(240, 430 + fallY); // dandelion position
  drawSquares(theta);
  drawTriangles(theta);
  drawCircles(theta);
  pop();

  // Happy Moment
  happyMoment();
}

// dandelion stem //
function drawStem(theta) {
  const stemLen = 180;
  push();
  translate(240, 430); // dandelion position
  rotate(theta);

  stroke("#C7FFC1");
  strokeWeight(3);
  line(0, 0, 0, -stemLen);
  pop();
}

// Squares //
function drawSquares(theta) {
  const stemLen = 180;
  const numSquares = 12;
  const orbitR = 100;
  const rotSpeed = TWO_PI / (60 * 60);
  const globalAngle = falling ? 0 : frameCount * rotSpeed;

  rotate(theta);
  for (let i = 0; i < numSquares; i++) {
    const angle = (TWO_PI / numSquares) * i + globalAngle;
    const x = cos(angle) * orbitR;
    const y = -stemLen + sin(angle) * orbitR;

    push();
    translate(x, y);
    rotate(angle);
    stroke(255);
    strokeWeight(2);
    fill(colorsSquares[i]);
    rect(0, 0, 22, 22);
    pop();
  }
}

// Triangles //
function drawTriangles(theta) {
  const stemLen = 180;
  const numTriangles = 8;
  const orbitR = 120;
  const rotSpeed = TWO_PI / (60 * 5);
  const globalAngle = falling ? 0 : frameCount * rotSpeed;

  rotate(theta);
  for (let i = 0; i < numTriangles; i++) {
    
    const angle = (TWO_PI / numTriangles) * i + globalAngle;
    const x = cos(angle) * orbitR;
    const y = -stemLen + sin(angle) * orbitR;

    push();
    translate(x, y);
    rotate(angle + PI/2);
    stroke("#FFCEDA");
    strokeWeight(2);
    fill("#FF275E");
    triangle(-18, 18, 18, 18, 0, -30);
    pop();
  }
}

// blue circles //
function drawCircles(theta) {
  const stemLen = 180;
  const numCircles = 8;
  const orbitR = 180;
  const rotSpeed = -TWO_PI / (60 * 50);
  const globalAngle = falling ? 0 : frameCount * rotSpeed;

  // size change
  let ms = millis();
  let size = map(ms % 2000, 0, 2000, 10, 50);

  rotate(theta);
  for (let i = 0; i < numCircles; i++) {
    const angle = (TWO_PI / numCircles) * i + globalAngle;
    const x = cos(angle) * orbitR;
    const y = -stemLen + sin(angle) * orbitR;

    push();
    translate(x, y);
    stroke("#95C9FF");
    strokeWeight(2);
    fill("#0048FF");
    ellipse(0, 0, size, size);
    pop();
  }
}

// mouse click //
function mousePressed() {
  falling = true;
}

// Happy Moment —— //
function happyMoment() {
  let ms = millis();
  let secs = (ms / 70).toFixed(2); //my happy time always going so fast

  noStroke();
  fill(255);
  textSize(20);
  textFont("Courier New");
  text(`HappyMoment: ${secs} s`, 10, height - 10);
}
