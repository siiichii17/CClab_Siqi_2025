function setup() {
  let cnv = createCanvas(720, 500);
  cnv.parent("p5-canvas"); // ⭐ 必须加
  noStroke();
}

function draw() {
  // 天空Sky color gradient
  fill(255, 220, 180); rect(0, 0, 720, 26);
  fill(255, 200, 150); rect(0, 26, 720, 26);
  fill(255, 170, 120); rect(0, 52, 720, 26);
  fill(255, 120, 80);  rect(0, 78, 720, 26);
  fill(230, 80, 60);   rect(0, 104, 720, 26);

  // Sun
  push();
  blendMode(ADD);
  fill(255, 213, 0, 150);
  circle(300, 80, 120); 
  fill(255, 213, 0);
  circle(300, 80, 70);  
  pop(); 

  // Mountain（right）
  fill(125, 67, 54);
  triangle(460, 130, 560, 70, 660, 130);
  triangle(560, 130, 760, 40, 760, 130);

  // Mountain-close
  fill(99, 33, 10);
  triangle(150, 130, 250, 60, 350, 130);
  triangle(50, 130, 150, 90, 250, 130);
  triangle(300, 130, 420, 80, 540, 130);
  //shadow
  fill(80, 30, 10, 100);
  triangle(460, 130, 560, 70, 560, 130); 

  // 地面Floor
  fill(139, 0, 0);
  rect(0, 130, 720, 370);

  //ufo sprinkler shadow
  fill(0, 0, 0, 100);
  ellipse(620, 200, 180, 40); // UFO 
  ellipse(346, 330, 120, 20); // S

  //UFO-Carousel
  push();
  translate(620, 172);
  // Main UFO body
  fill(40);
  ellipse(0, 0, 160, 40);
  // Upper body
  fill(196, 177, 173);
  ellipse(0, -17, 70, 30);
  rotate(sin(frameCount * 0.05) * 0.26);
  // Chair
  stroke(230);
  line(-25, 0, -25, 30);
  line(0, 0, 0, 35);
  line(25, 0, 25, 30);
  noStroke();

  fill(0);
  rect(-30, 30, 10, 6); // 左
  rect(-5, 35, 10, 6);  // 中
  rect(20, 30, 10, 6);  // 右

  pop();

  //排水坑 sand pit
  fill(194, 178, 128); 
  noStroke();
  quad(95, 357, 325, 357, 294, 427, 52, 427);

  // gutter
  fill(100, 180, 255, 180); 
  noStroke();
  quad(336, 298, 356, 298, 325, 357, 259, 357);

  // Animal turtle
  fill(181, 129, 45); 
  noStroke();
  ellipse(160, 390, 50, 35); // 身体
  ellipse(135, 390, 12, 12); // 左脚
  ellipse(185, 390, 12, 12); // 右脚
  ellipse(160, 375, 12, 12); // 上脚
  ellipse(160, 405, 12, 12); // 下脚
  ellipse(125, 390, 14, 14); // 头

  // fish
  fill(181, 129, 45);
  ellipse(260, 400, 45, 25); // 身体
  triangle(280, 400, 300, 390, 300, 410); // 尾巴
  ellipse(250, 395, 6, 6);  // 眼睛

  // sprinkler洒水器
  push();
  translate(346, 298);
  scale(1.4);

  //底部Bottom
  fill(50);
  ellipse(0, 0, 100, 40);
  fill(20);
  ellipse(0, 0, 70, 30);
  
  // 柱子Body
  noStroke();
  fill(80);
  rect(-5, -50, 10, 50);

  // 喷头Spray part
  fill(100);
  ellipse(0, -50, 25, 25);

  // Water
  stroke(100, 180, 255);
  strokeWeight(2);

  // left center right , water drop 
  let offsets = [-40, 0, 40];
  for (let i of offsets) {
    for (let t = 0; t <= 1; t += 0.1) {
      let x1 = i * t;
      let y1 = -50 + (t * t) * 80;
      let x2 = i * (t + 0.05);
      let y2 = -50 + ((t + 0.05) * (t + 0.05)) * 80;
      line(x1, y1, x2, y2);
    }
  }
  pop();

  //Swing Left
  stroke(80);
  strokeWeight(6);
  line(560, 300, 520, 430);  // 右腿
  
  // Left shadow
  stroke(50, 40, 40, 178);
  strokeWeight(8);
  line(656, 500, 520, 430);  

  // 右边三角架
  stroke(80);
  line(650, 300, 690, 430);  // 左腿

  // RIght shadow
  stroke(50, 40, 40, 178);
  strokeWeight(6);
  line(719, 445, 690, 430);

  // 顶部横梁Top
  stroke(80);
  strokeWeight(8);
  line(530, 300, 680, 300);

  // Swing1
  stroke(0);
  strokeWeight(3);
  line(560, 300, 550, 380); // 左绳
  line(580, 300, 568, 380); // 右绳
  fill(200, 0, 0);
  noStroke();
  rect(545, 380, 30, 10);   // 座椅

  //Swing2
  stroke(0);
  strokeWeight(3);
  line(630, 300, 640, 370); // 左绳
  line(650, 300, 660, 370); // 右绳
  fill(255, 200, 0);
  noStroke();
  rect(636, 370, 30, 10);   // 座椅

  //Shadow of swing
  fill(50, 40, 40, 178);
  noStroke();
  quad(647, 476, 677, 476, 727, 501, 697, 501);

  noStroke();
  quad(700, 476, 720, 476, 800, 501, 750, 501);

  // Black Door
  fill(0);
  quad(133,500, 222,500, 222,390, 133,380);

  quad(471,500, 560,500, 560,380, 471,390);

  // Connect 2doors
  fill(0);
  rect(222,390, 249, 5); 

  // door handle
  fill(180);
  ellipse(210, 450, 10, 10); // Left
  ellipse(480, 450, 10, 10); //R

  //Seesaw
  push();
  // yellow wood
  fill(210, 160, 60);
  noStroke();
  quad(131,199, 271,183, 291,199, 111,219);
  fill(210, 160, 60);
  quad(131,199, 271,183, 291,199, 111,219);
  fill(150, 110, 40);
  quad(111,219, 291,199, 291,210, 111,230);

  // 左支点Left
  fill(0, 180, 200);
  noStroke();
  triangle(167, 232, 235, 232, 203, 205);

  // handle
  stroke(200, 0, 0);
  strokeWeight(4);
  // Left handle
  line(140, 206, 140, 170);
  line(160, 199, 160, 170);
  line(140, 170, 160, 170);

  // right handle
  line(240, 195, 240, 160);
  line(260, 189, 260, 160);
  line(240, 160, 260, 160);
  pop();
}
