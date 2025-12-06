// Background color (from bottom to top: warm → cold represents the change from good mood to bad mood in my heart)
const BG = [
  "#66130f", 
  "#994239",
  "#b86b30",
  "#d8c066", 
  "#5e9c7a", 
  "#5b3a9a",
  "#1a1a1a" 
];

// The main bottom white circles represent Monday to Sunday from left to right

let dots = { mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [] };

function setup() {
  // 关键：把画布塞进 id="p5-data-canvas" 的 div 里
  let cnv = createCanvas(600, 600);
  cnv.parent("p5-data-canvas");

  noStroke();

  const bandH = height / BG.length;
  const getY = (band, pos) => height - bandH * (band + 1) + bandH * pos;

  // Monday mood vertically
  moodDots(dots.mon, 75, getY(5, 0.5), 10, ["#0455FF", "#81B6FC"]);

  // Tuesday mood vertically
  moodDots(dots.tue, 150, getY(6, 0.6), 10, ["#000000"], { stroke: "#ffffff" });

  // Wednesday mood vertically (hover)
  moodDots(dots.wed, 225, getY(4, 0.5), 21, ["#8a6be0", "#7CFFD8"], { hover: true });

  // Thursday mood vertically
  moodDots(dots.thu, 300, getY(3, 0.5), 20, ["#FFE968", "#7CFFD8"]);

  // Friday mood vertically
  moodDots(dots.fri, 375, getY(2, 0.5), 16, ["#ff8fb0", "#d85b4d", "#f7d76c"]);

  // Saturday mood vertically
  moodDots(dots.sat, 450, getY(0, 0.5), 18, ["#ff554f"]);

  // Saturday mood vertically
  moodDots(dots.sun, 525, getY(2, 0.5), 12, ["#ff9dcf", "#b48be2"], { rise: true });
}

function draw() {
  // Background made of rectangles
  
  const h = height / BG.length;
  for (let i = 0; i < BG.length; i++) {
    fill(BG[i]);
    rect(0, height - h * (i + 1), width, h);
  }

  // The average of the 7 white circles at the bottom
  fill(255);
  for (let i = 0; i < 7; i++) {
    ellipse(75 + i * 75, 550, 40);
  }

  // Draw all mood particles
  for (let day in dots) {
    for (let p of dots[day]) {
      
      //Mood particle movement (representing the feeling of breathing)
      
      let yy = p.y + sin(frameCount * 0.1 + p.phase) * 1.2;

      // Wednesday hover: swings up and down greatly, because I feel a little happier because half of the week has passed, but I still have a lot of classes every day so my mood will fluctuate.
      
      if (p.hover && dist(mouseX, mouseY, p.x, p.y) < 45) {
        yy = p.y + sin(frameCount * 0.03) * 80;
      }

      // Because after Sunday comes another week of work, my mood immediately becomes bad in the evening.
      
      if (p.rise && !p.done && dist(mouseX, mouseY, p.x, p.y) < 45) {
        p.done = true;
      }
      if (p.done && p.y > 80) {
        p.y -= 0.5; // Speed
        yy = p.y;
      }

      if (p.stroke) {
        stroke(p.stroke);
        strokeWeight(2);
      }
      fill(p.c);
      ellipse(p.x, yy, 14);
      noStroke();
    }
  }
}

// All the mood particles of every day
function moodDots(arr, x, y, n, colors, opt = {}) {
  for (let i = 0; i < n; i++) {
    arr.push({
      x: x + random(-16, 20),      
      y: y + random(-18, 30),     
      c: color(random(colors)),
      phase: random(TWO_PI),  
      hover: opt.hover || false, 
      rise: opt.rise || false, 
      stroke: opt.stroke || null,  
      done: false 
    });
  }
}
