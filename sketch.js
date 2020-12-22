var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime=0;
var score=0;
var obstacleGroup, bananaGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
  monkey_running =                        loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup()
{
  createCanvas(600,400);
  
  //sprite for monkey
  monkey = createSprite(70,340,10,10);
  monkey.addAnimation( "running",monkey_running);
  monkey.scale=0.1;
  
  //sprite for ground
  ground = createSprite(300,358,780,10);
  ground.velocityX=-3;
  ground.x = ground.width /2;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}

function draw() 
{
  background("white");
  
  if (gameState === PLAY) {
      
    //reset ground
  if (ground.x < 300)
     {
      ground.x = ground.width/2;
     }
    
    //if we press space monkey should jump
  if (keyDown("space") && monkey.y >=115) 
     {
      monkey.velocityY=-10;
     }
    
    //to add gravity
  monkey.velocityY = monkey.velocityY+0.9;
  monkey.collide(ground);
    
    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
      }
    
    if (bananaGroup.isTouching(monkey)) {
         
      bananaGroup.destroyEach();
      
        }
    
    
  stroke("white");
  textSize(20);
  fill("white");
  text("score  "+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
  
  food();
  stop();
  
    
    
      }
  
  else if (gameState === END) {
    
    monkey.velocity = 0;
    ground.velocity = 0;
    
    obstacleGroup.setVelocityEach(0);
    bananaGroup.setVelocityEach(0);
    
    
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  drawSprites();
}

//function of food
function food()
{
  if (frameCount % 80 === 0) 
  {
    banana = createSprite(250,130,10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=120;
    
    banana.x = Math.round(random(400,450));
    banana.y = Math.round(random(120,150));
    
    monkey.depth = banana.depth;
    monkey.depth = monkey.depth+1;
    
    bananaGroup.add(banana);
  }
}

//function of obstacles
function stop() 
{
  if (frameCount % 300 === 0)
  {
    obstacle = createSprite(300,339,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.09;
    obstacle.velocityX=-5; 
    obstacle.lifetime=120;
    obstacle.x = Math.round(random(450,460)); 
    
    obstacleGroup.add(obstacle);
  }
}

