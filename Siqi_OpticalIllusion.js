let t = 0;
let cellSize = 30;

function setup() {
  // 创建画布并放进 HTML 里的 div（id 一定要对上）
 let cnv = createCanvas(600, 600);
 cnv.parent("p5-OpticalIllusion");
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(10);

  // ==== 中间大块：左右两种不同的幻觉 ====
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 20; j++) {
      // 颜色随时间和位置变化
      let r = 128 + 127 * sin(t + i * 0.3);
      let g = 128 + 127 * sin(t + j * 0.3);
      let b = 128 + 127 * cos(t + (i + j) * 0.2);

      // 描边颜色
      let sr = 200 + 55 * sin(t + i * 0.5);
      let sg = 200 + 55 * cos(t + j * 0.4);
      let sb = 255;

      // 网格位置
      let x = i * cellSize + cellSize / 2;
      let y = j * cellSize + cellSize / 2;

      if (mouseX < width / 2) {
        // 左半边：左右轻微波动的圆
        let offsetX = sin(t + i * 0.5) * 12;
        let offsetY = cos(t + j * 2) * 5;

        stroke(sr, sg, sb, 200);        // 这里直接用固定的 alpha
        strokeWeight(2 + sin(t + i * 0.3) * 1.5);
        fill(r, g, b, 160);
        ellipse(x + offsetX, y + offsetY, cellSize, cellSize);
      } else {
        // 右半边：旋转的矩形
        let angle = t + (i + j) * 0.1;
        let w = cellSize * (0.6 + 0.4 * sin(t + j * 0.3));
        let h = cellSize * (0.6 + 0.4 * cos(t + i * 0.3));

        push();
        translate(x, y);
        rotate(angle);
        stroke(sr, sg, sb, 220);
        strokeWeight(1.2);
        fill(r, g, b, 130);
        rect(0, 0, w, h);
        pop();
      }
    }
  }

  // ==== 左上角：同心圆波纹 ====
  push();
  translate(width * 0.15, height * 0.15);
  noFill();
  for (let k = 0; k < 15; k++) {
    let radius = k * 12 + 20 * sin(t + k * 0.2);
    let hueR = 120 + 80 * sin(t + k * 0.3);
    stroke(hueR, 200, 255, 200);
    strokeWeight(1.5);
    ellipse(0, 0, radius * 2, radius * 2);
  }
  pop();

  // ==== 右下角：螺旋点阵 ====
  push();
  translate(width * 0.85, height * 0.85);
  noFill();
  strokeWeight(2);
  for (let k = 0; k < 40; k++) {
    let rad = k * 6 + t * 20;
    let x = cos(k * 0.2 + t) * rad;
    let y = sin(k * 0.2 + t) * rad;
    let br = 150 + 100 * sin(t + k * 0.3);
    stroke(200, br, 255, 200);
    point(x, y);
  }
  pop();

  // 时间推进
  t += 0.03;
}
