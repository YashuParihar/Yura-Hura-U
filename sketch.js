var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jake, jake_running;

//var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
//var backgroundImg
var score=0;
var jumpSound

var gameOver, restart;

var corona

var Track, invisibleTrack, TrackImage;

function preload(){
  jumpSound = loadSound("jump.wav")
  //collidedSound = loadSound("collided.wav")
  
 // backgroundImg = loadImage("backgroundImg.png")
  sunAnimation = loadImage("sun.png");
  
  jake_running = loadAnimation("Jake1.png","Jake2.png","jake3.png","jake4.png","jake5.png");
  //trex_collided = loadAnimation("trex_collided.png");
  
  TrackImage = loadImage("Track.jpg");
  
 // cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
 // obstacle4 = loadImage("obstacle4.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.1
  
 // trex = createSprite(50,height-70,20,50);
  jake = createSprite(150,200,210,250)
  
  jake.addAnimation("running", jake_running);
  //trex.addAnimation("collided", trex_collided);
  jake.setCollider('circle',0,0,350)
  //trex.scale = 0.08
  // trex.debug=true
  
  invisibleTrack = createSprite(width/2,height-10,width,125);  
  invisibleTrack.shapeColor = "#f4cbaa";
  
  Track = createSprite(200,25,310,320);
  Track.addImage("Track",TrackImage);
  //Track.x = width/
  Track.velocityY= -(6 + 3*score/100);
  
  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

 // cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  //background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    Track.velocityY = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && jake.y  >= height-120) {
      jumpSound.play( )
      jake.velocityY = -10;
       touches = [];
    }
    
   // trex.velocityY = trex.velocityY + 0.8
  
    if (Track.y < 0){
      Track.y = Track.width/2;
    }
  
    jake.collide(invisibleTrack);
    //spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(jake)){
       // collidedSound.play()
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    Track.velocityY = 0;
    jake.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
   // cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
 // if (frameCount % 60 === 0) {
 //   var cloud = createSprite(width+20,height-300,40,10);
 //   cloud.y = Math.round(random(100,220));
 //   cloud.addImage(cloudImage);
 //   cloud.scale = 0.5;
 //   cloud.velocityX = -3;
    
 //    //assign lifetime to the variable
 //   cloud.lifetime = 300;
    
    //adjust the depth
 //   cloud.depth = trex.depth;
 //   trex.depth = trex.depth+1;
    
    //add each cloud to the group
  //  cloudsGroup.add(cloud);
 // }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}