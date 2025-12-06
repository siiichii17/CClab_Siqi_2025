// Siqi- Emotional Eating Game
// Game state management
let gameState = 0;  // Controls which scene to show 
let emotionStage = 0;  //different emotion scene
let player;  // Player character object from last assignment
let obstacles = []; 
let foods = [];  
let score = 0; 
let foodCount = 0; 


let angry1, angry2, angry3;
let sad1, sad2, sad3;
let nervous1, nervous2, nervous3;
let bg1, bg2, bg3;
let eatSound;


let animOffset = 0;
let animSpeed = 0.1;

let obstacleSpeed = 2.5; 
let loopCount = 0;   

function preload() {
  bg1 = loadImage('image/bg1.gif');
  bg2 = loadImage('image/bg2.png');
  bg3 = loadImage('image/bg3.png');

  angry1 = loadImage('image/angry1.png');
  angry2 = loadImage('image/angry2.png');
  angry3 = loadImage('image/angry3.png');

  sad1 = loadImage('image/sad1.png');
  sad2 = loadImage('image/sad2.png');
  sad3 = loadImage('image/sad3.png');

  nervous1 = loadImage('image/nervous1.png');
  nervous2 = loadImage('image/nervous2.png');
  nervous3 = loadImage('image/nervous3.png');

  eatSound = loadSound('image/eat.mp3');
}


function setup() {
  let cnv = createCanvas(600, 400);
  cnv.parent("p5-game");     // ⭐ 把画布放到 <div id="p5-game"> 里面

  rectMode(CENTER);
  imageMode(CENTER);
  player = new Player();
}


// MAIN GAME LOOP 

// Continuously runs first scene
function draw() {
  
  animOffset += animSpeed;
  
  // SWITCH STATEMENT controls scene transitions
  switch(gameState) {
    case 0:
      startScreen(); 
      break;
    case 1:
      playScreen();  //middle
      break;
    case 2:
      endScreen();  
      break;
  }
}


// BEGINNING SCENE
function startScreen() {
  background(204, 204, 255);
  fill(255, 100, 150);
  textSize(40);
  textAlign(CENTER, CENTER);
  text("Emotional Eating", 300, 100);
  fill(50);
  textSize(20);
  text("Press R to start", 300, 160);
  text("Use SPACE to jump", 300, 190);
  text("Collect Food, Avoid Obstacles,and Release Your Pressure!", 300, 220);
  
  push();
  translate(-60, 100);
  drawMyCharacter(300, 200, 0.3);
  pop();
}


//MIDDLE SCENE

function playScreen() {
  // Display background based on current emotion stage
  switch(emotionStage) {
    case 0:
      image(bg1, width/2, height/2, width, height);
      break;
    case 1:
      image(bg2, width/2, height/2, width, height);
      break;
    default:
      image(bg3, width/2, height/2, width, height);
  }

  // Display score
  fill(255);
  textSize(20);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  player.update();
  player.show();

  //Randomly show the obstacles
  if (frameCount % 100 === 0) {
    obstacles.push({x: 600, w: 50, gap: 250, top: random(60, 110)});
  }

  // Randomly show the food img
  if (frameCount % 80 === 0) {
    let imgSet;
    if (emotionStage === 0) {
      imgSet = [angry1, angry2, angry3];
    } else if (emotionStage === 1) {
      imgSet = [sad1, sad2, sad3];
    } else {
      imgSet = [nervous1, nervous2, nervous3];
    }
    foods.push({
      x: 600,
      y: random(80, 320),
      size: 45,
      img: imgSet[floor(random(3))]
    });
  }

 // Update obstacles
for (let i = obstacles.length - 1; i >= 0; i--) {
  let o = obstacles[i];
  o.x -= obstacleSpeed; 

  // different shape obstacles
  
  if (emotionStage === 0) {
    // Angry 
    fill(200, 50, 50);

    let shake = sin(animOffset * 10) * 5;

    triangle(
      o.x + shake, 0,
      o.x + o.w + shake, 0,
      o.x + o.w / 2 + shake, o.top
    );

    let bottomHeight = height - o.top - o.gap;
    triangle(
      o.x + shake, height,
      o.x + o.w + shake, height,
      o.x + o.w / 2 + shake, height - bottomHeight
    );

  } else if (emotionStage === 1) {
    // Sad 
    fill(30, 80, 200, 180);

    let floatY = sin(animOffset * 2) * 5;

    for (let y = 0; y < o.top; y += 20) {
      ellipse(o.x + o.w/2, y + floatY, 25, 25);
      ellipse(o.x + o.w/2 + 15, y + 10 + floatY, 20, 20);
      ellipse(o.x + o.w/2 - 15, y + 5 + floatY, 18, 18);
    }

    let bottomHeight = height - o.top - o.gap;
    for (let y = height; y > height - bottomHeight; y -= 20) {
      ellipse(o.x + o.w/2, y + floatY, 25, 25);
      ellipse(o.x + o.w/2 + 15, y - 10 + floatY, 20, 20);
      ellipse(o.x + o.w/2 - 15, y - 5 + floatY, 18, 18);
    }

  } else {
    // Nervous细线交错闪烁
    let alpha = map(sin(animOffset * 8), -1, 1, 80, 255);  
stroke(0, alpha);    
strokeWeight(4);     
noFill();

    for (let y = 0; y < o.top; y += 10) {
      line(o.x, y, o.x + o.w, y + 10);
      line(o.x + o.w, y, o.x, y + 10);
    }

    let bottomHeight = height - o.top - o.gap;
    for (let y = height; y > height - bottomHeight; y -= 10) {
      line(o.x, y, o.x + o.w, y - 10);
      line(o.x + o.w, y, o.x, y - 10);
      
      stroke(0);
strokeWeight(1);
    }
  }

  // 
  if (o.x < 115 && o.x > 45 && 
      (player.y - 25 < o.top || player.y + 35 > o.top + o.gap)) {
    gameState = 2; 
  }
    
  if (o.x < -o.w) {
    obstacles.splice(i, 1);
    score += 10;
  }
}


  // Update food 
  for (let i = foods.length - 1; i >= 0; i--) {
    let f = foods[i];
    f.x -= 2.5;  // Move food left
    image(f.img, f.x, f.y, f.size, f.size);

    // Check if player collects food
    if (dist(f.x, f.y, player.x, player.y) < f.size + 20) {
      foods.splice(i, 1);

  eatSound.play(); 
      
      score += 5;
      foodCount++;

      // Change scene after collecting 5 foods
      if (foodCount >= 5) {
        foodCount = 0;
        emotionStage++;
        // Loop back to first stage 
        if (emotionStage > 2) {
          emotionStage = 0;  
            loopCount++;             
    obstacleSpeed += 2.0 + loopCount * 0.6; 
          
        }
      }
    }
    
    // Remove food if it goes off screen
    if (f.x < -f.size) foods.splice(i, 1);
  }

  // Check if game ends
  if (player.y < 0 || player.y > 380) {
    gameState = 2;  
  }
}



// END SCENE
function endScreen() {
  background(150, 150, 200);
  fill(51, 51, 255);
  textSize(50);
  textAlign(CENTER, CENTER);
  
  text("YES! You Made It!", 300, 100);
  
  textSize(30);
  text("Final Score: " + score, 300, 170);
  textSize(24);
  text("Press R to play again", 300, 340);
  
  // Display character
  push();
  translate(-60, 10);
  drawMyCharacter(200, 200, 0.25);
  pop();
}


// KEYBOARD

function keyPressed() {
  if (gameState === 0 && (key === 'r' || key === 'R')) {
    gameState = 1;  // Start game with R key
  } else if (gameState === 1 && key === ' ') {
    player.jump();  // Make player jump with SPACE
  } else if (gameState === 2 && (key === 'r' || key === 'R')) {
    resetGame();  // Restart game with R key
  }
}


function resetGame() {
  gameState = 1;
  emotionStage = 0;  // Start from first emotion stage
  player = new Player();
  obstacles = [];
  foods = [];
  score = 0;
  foodCount = 0;
  
  obstacleSpeed = 2.5;   
loopCount = 0; 
}



// PLAYER
class Player {
  constructor() {
    this.x = 100;  // Horizontal position
    this.y = 200;  // Vertical position
    this.v = 0;  // Velocity
    this.gravity = 0.8;  // Gravity force
    this.jumpPower = -9;  // Jump force
  }

  // Makes player jump
  jump() {
    this.v = this.jumpPower;
  }

  update() {
    this.v += this.gravity;  // Apply gravity
    this.y += this.v;  // Update position
    this.y = constrain(this.y, 30, 320);  // Keep player in bounds
  }

  show() {
    push();
    translate(this.x - 60, this.y - 60);
    drawMyCharacter(60, 60, 0.18);
    pop();
  }
}


//CHARACTER DRAWING FUNCTIONS

// copy from my HW lol
function drawMyCharacter(x, y, scaleSize) {
  push();
  translate(x, y);
  scale(scaleSize);
  
  // Head
  heartHead(0, -80, "#FFE5B4", "#4E3B53");
  fill("#FFE5B4");
  rect(0, -20, 30, 50);
  
  // Body (heart shape)
  push();
  fill("pink");
  beginShape();
  vertex(0, 0);
  bezierVertex(-100, -80, -120, 50, 0, 120);
  bezierVertex(120, 50, 100, -80, 0, 0);
  endShape(CLOSE);
  
  // Face details
  push();
  stroke(0);
  translate(0, 40);
  fill(255);
  ellipse(-40, -20, 40, 25);
  ellipse(40, -20, 40, 25);
  fill(0);
  ellipse(-40, -20, 15, 15);
  ellipse(40, -20, 15, 15);
  rect(0, 30, 50, 15);
  fill(255);
  rect(0, 30, 45, 10);
  fill(0);
  rect(-15, 30, 5, 10);
  rect(0, 30, 5, 10);
  rect(15, 30, 5, 10);
  pop();
  pop();
  
  // Arms
  stroke("pink");
  strokeWeight(30);
  line(-80, 0, -140, 60);
  line(80, 0, 140, 60);
  noStroke();
  
  // Legs
  stroke(0);
  strokeWeight(1);
  fill(255);
  quad(-70, 120, -10, 120, -40, 170, -80, 170);
  quad(-88, 160, -20, 160, -50, 220, -90, 220);
  quad(70, 120, 10, 120, 40, 170, 80, 170);
  quad(88, 160, 20, 160, 50, 220, 90, 220);
  
  // Shoes
  fill("rgb(200,130,238)");
  rect(-70, 245, 100, 20);
  rect(70, 245, 100, 20);
  fill("lightgreen");
  ellipse(-70, 220, 100, 30);
  ellipse(-110, 220, 50, 50);
  ellipse(70, 220, 100, 30);
  ellipse(110, 220, 50, 50);
  pop();
}

// hair and mouth
function heartHead(x, y, skinColor, hairColor) {
  noStroke();
  fill(skinColor);
  rect(x, y, 100, 100);
  fill(hairColor);
  rect(x, y - 40, 120, 60);
  rect(x - 70, y - 15, 30, 110);
  rect(x + 70, y - 15, 30, 110);
  fill(0);
  rect(x - 20, y, 15, 15);
  rect(x + 20, y, 15, 15);
  fill("orange");
  triangle(x, y + 15, x - 10, y + 30, x + 10, y + 30);
}