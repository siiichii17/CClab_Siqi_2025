function setup() {
  let cnv = createCanvas(400, 600);
  cnv.parent("p5-exquisite");   // ⭐ 放进 HTML 里 id 为 p5-exquisite 的 div
  rectMode(CENTER);
}

function draw() {
  background(220);

  // Head——my own design
  heartHead(width/2, 200, "#FFE5B4", "#4E3B53");

  //Neck
  fill("#FFE5B4");
  rect(width/2, 260, 30, 50);

  //HeartBody By Luck（another section
  push();
  
  translate(width/2, 280);
  fill("pink");
  beginShape();
  vertex(0, 0);
  bezierVertex(-100, -80, -120, 50, 0, 120);
  bezierVertex(120, 50, 100, -80, 0, 0);
  endShape(CLOSE);
  
  push();
  stroke(0);
  translate(0, 40);
  fill(255);
  ellipse(-40, -20, 40, 25);
  ellipse(40, -20, 40, 25);

  fill(0);
  ellipse(-40, -20, 15, 15);
  ellipse(40, -20, 15, 15);

  fill(0);
  rect(0, 30, 50, 15);
  fill(255);
  rect(0, 30, 45, 10);

  // teeth
  fill(0);
  rect(-15, 30, 5, 10);  // L
  rect(0, 30, 5, 10);    // C
  rect(15, 30, 5, 10);   // R
  pop();
  pop();

  // two Arms
  stroke("pink");
  strokeWeight(30); 
  line(width/2 - 80, 280, width/2 - 140, 340);
  line(width/2 + 80, 280, width/2 + 140, 340);
  noStroke();

  
  //Legs design by Lydia（another section
  stroke(0);
  strokeWeight(1);
  fill(255);

  // Left up part
  quad(130, 400, 190, 400, 160, 450, 120, 450);
  // Left down Part
  quad(112, 440, 180, 440, 150, 500, 110, 500);

  // Right up part
  quad(400-130, 400, 400-190, 400, 400-160, 450, 400-120, 450);
  // Right down part
  quad(400-112, 440, 400-180, 440, 400-150, 500, 400-110, 500);

  // shoes button
  fill("rgb(200,130,238)");
  rect(130, 525, 100, 20); 
  rect(270, 525, 100, 20);

  // L
  fill("lightgreen");
  ellipse(130, 500, 100, 30);
  ellipse(90, 500, 50, 50);

  // R
  ellipse(400-130, 500, 100, 30);
  ellipse(400-90, 500, 50, 50);
}

//User-defined Functions

function heartHead(x, y, skinColor, hairColor) {
  noStroke();
  fill(skinColor); // skin
  rect(x, y, 100, 100);

  fill(hairColor); // hair
  rect(x, y-40, 120, 60);
  rect(x-70, y-15, 30, 110); // left hair
  rect(x+70, y-15, 30, 110); // right hair

  // Eyes
  fill(0);
  rect(x-20, y, 15, 15);
  rect(x+20, y, 15, 15);

  // Triangle mouth
  fill("orange");
  triangle(x, y+15, x-10, y+30, x+10, y+30);
}
