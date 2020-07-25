//Global Variables
var bananaImage, obstacleImage, groundImage, backImage;
var obstacleGroup, background, player_running;
var ground, bananaGroup, Monkey, MonkeyImage;

var score = 0;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  MonkeyImage = loadImage("Monkey_01.png");

  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  groundImage = loadImage("ground.jpg");
}


function setup() {
  createCanvas(600, 300);

  background1 = createSprite(200, 180, 1600, 20);
  background1.addImage("background", backImage);
  background1.x = background1.width / 2;
  background1.velocityX = -4;

  ground = createSprite(0, 380, 600, 20);
  ground.addImage("ground", groundImage);
  ground.scale = .15;
//  ground.x = ground.width / 2;
//  ground.velocityX = -4;
  ground.visible = false;

  Monkey = createSprite(50,260,40,50);
  Monkey.addAnimation("running", player_running);
//  Monkey.addImage("running", MonkeyImage);
  Monkey.velocityX = 0;
  Monkey.velocityY = 0;
  Monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();

  stroke("white");
  textSize(20);
  fill("white");
  
  
}


function draw() {
  background(180);

  //display score
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 100);

  if (background1.x < 100){
      background1.x = background1.width/2;
  }
  
  switch (score) {
    case 10:
      Monkey.scale = 0.12;
      break;
    case 20:
      Monkey.scale = 0.14;
      break;
    case 30:
      Monkey.scale = 0.16;
      break;
    case 40:
      Monkey.scale = 0.18;
      break;
    default:
      break;

  }

  if (keyDown("space")) {
    Monkey.velocityY = -12;

  }

  //add gravity
  Monkey.velocityY = Monkey.velocityY + 0.8;

  Monkey.collide(ground);

  givefood();
 
  obstacles();
 
  if(Monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 2;
    }
  if(Monkey.isTouching(obstacleGroup)){
      score = score - 2;
    }

   drawSprites();       

}

function givefood() {

  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {

    var banana = createSprite(650, 265, 10, 40);
    banana.x = 600;
    banana.y = Math.round(random(180,220));;
    banana.addImage("Banana", bananaImage);
    banana.setCollider("circle", 0, 0, 20)
    banana.scale = 0.05;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 234;

    //adjust the depth
    banana.depth = Monkey.depth;
    banana.depth = Monkey.depth + 1;

    //add each banana to the group
    bananaGroup.add(banana);

  }
}

function obstacles() {
  if(World.frameCount % 300 === 0) {
    var stone = createSprite(600,265,10,40);
    
    stone.velocityX = -6;

    stone.addImage("Stone", obstacleImage);
    stone.scale = 0.15 ;
    stone.setCollider("circle",0,0,20);

    //assign scale and lifetime to the obstacle           
    stone.lifetime = 270;
    //add each obstacle to the group
    obstacleGroup.add(stone);
  }
}
