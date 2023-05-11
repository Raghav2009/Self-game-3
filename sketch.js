var rider, riderImg;
var rockImg;
var tallGrass, tallGrassImg;
var ground;
var bg, bgImg;
var barrier, barrierImg;
var bird, birdImg;
var lives = 5;
var obstaclesGroup, birdsGroup, grassGroup;
var score = 0;
var gameState = "play"
var gameOver, gameOverImg;

function preload() {
  riderImg = loadImage("assets/rider.png")
  rockImg = loadImage("assets/rock.png")
  tallGrassImg = loadImage("assets/tall_grass.png")
  barrierImg = loadImage("assets/barrier.png")
  bgImg = loadImage("assets/bg_grassland.png")
  birdImg = loadImage("assets/bird.png")
  gameOverImg = loadImage("assets/game over.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rider = createSprite(width / 2 - 570, height / 2 + 200, 50, 50);
  rider.addImage(riderImg);
  rider.scale = 0.5;

  ground = createSprite(width / 2, height / 2 + 340, windowWidth + 500, 43)
  ground.visible = false;;
  ground.velocityX = -5;

  gameOver = createSprite(width / 2, height / 2, 70, 70);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  obstaclesGroup = createGroup();
  birdsGroup = createGroup();
  grassGroup = createGroup();
}

function draw() {
  background(bgImg);

  if (gameState == "play") {
    if (ground.x <= 0) {
      ground.x = width / 2;
    }

    if (keyIsDown(UP_ARROW)) {
      rider.velocityY = -15
    }
    rider.velocityY = rider.velocityY + 1;

    spawnObstacles();
    spawnBirds();
    spawnGrass();

    if (rider.y < 100) {
      rider.y = 150;
    }

    for (var i = 0; i < obstaclesGroup.length; i++) {
      if (rider.isTouching(obstaclesGroup[i])) {
        lives = lives - 1;
        obstaclesGroup[i].destroy();
      }
    }

    for (var j = 0; j < birdsGroup.length; j++) {
      if (rider.isTouching(birdsGroup[j])) {
        lives = lives - 1;
        birdsGroup[j].destroy();
      }
    }

    for (var k = 0; k < grassGroup.length; k++) {
      if (rider.isTouching(grassGroup[k])) {
        score = score + 1;
        grassGroup[k].destroy();
      }
    }

    if (lives == 0) {
      gameState = "end"
    }

  }

  else if (gameState == "end") {
    obstaclesGroup.destroyEach()
    birdsGroup.destroyEach()
    grassGroup.destroyEach()

    rider.destroy()

    gameOver.visible = true;


  }

  rider.collide(ground);

  drawSprites();

  fill("green")
  textSize(25);
  text("Lives Remaining: " + lives, 100, 100);

  text("Score: " + score, 400, 100);

  if (rider.y < 150) {
    fill("red")
    text("Oops! You can't touch the border!", 700, 100)
  }

}

function spawnObstacles() {
  if (frameCount % 250 == 0) {
    barrier = createSprite(width, height - 100);
    barrier.addImage(barrierImg)
    barrier.scale = 0.4;
    barrier.velocityX = -5;
    barrier.y = random(height / 2 + 100, height - 100)
    obstaclesGroup.add(barrier)

    var x = Math.round(random(1, 2));
    if (x == 1) {
      barrier.addImage(barrierImg);
    }
    else {
      barrier.addImage(rockImg);
    }
  }
}

function spawnBirds() {
  if (frameCount % 170 == 0) {
    bird = createSprite(width, random(30, 150));
    bird.addImage(birdImg);
    bird.velocityX = -6;
    bird.scale = 0.2;
    birdsGroup.add(bird);
  }
}

function spawnGrass() {
  if (frameCount % 130 == 0) {
    tallGrass = createSprite(width, random(height / 2 + 100, height - 100))
    tallGrass.addImage(tallGrassImg);
    tallGrass.velocityX = -10;
    tallGrass.scale = 0.4
    grassGroup.add(tallGrass);
  }
}