var trex,Bot,stop,gameState,Restart,gameover,HS,HSscore,score,flag,ground,invisibleGround,cloudsGroup,obstaclesGroup
var
treximg,Botimg,stopimg,Restartimg,gameoverimg,groundimg,cloudimg,o1img,o2img,o3img,o4img,o5img,o6img,trexStill,collisionimg
function preload(){
 treximg=loadAnimation("trex1.png","trex3.png","trex4.png")
  treximg=loadImage("trex_collided.png")
  Botimg = loadImage("bot.png")
  stopimg = loadImage("stop.png")
  Restartimg = loadImage("restart.png")
  gameoverimg = loadImage("gameOver.png")
  groundimg=loadImage("ground2.png")
  cloudimg=loadImage("cloud.png")
  o1img=loadImage("obstacle1.png")
   o2img=loadImage("obstacle2.png")
   o3img=loadImage("obstacle3.png")
   o4img=loadImage("obstacle4.png")
   o5img=loadImage("obstacle5.png")
   o6img=loadImage("obstacle6.png")
  trexStill=loadAnimation("trexStill.png")
  
}
function setup(){
  createCanvas(700,400);
  

//create a trex sprite
 trex = createSprite(100,380,20,50);
trex.addAnimation("trex",treximg);
//trex.addAnimation("still",trexStill);
 Bot = createSprite(600,125,10,10);
  Bot.addImage("Bot",Botimg)
  
 stop = createSprite(650,125,10,10);
  stop.addImage("Bot",stopimg);
 gameState = "play";
  
 Restart =createSprite(350,250,10,10);
  Restart.addAnimation("restart",Restartimg);
  
   gameover = createSprite(350,150,10,10);
  gameover.addAnimation("gameOver",gameoverimg);
  
  Restart.visible=false;
  gameover.visible=false;

 HScore = 0;


 
   
//scoreboard
 score = 0;
 flag=0;
//scale and position the trex
trex.scale = 0.5;
trex.x = 50;

//create a ground sprite
 ground = createSprite(200,380,400,20);
ground.addAnimation("ground2",groundimg);
ground.x = ground.width /2;

 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;

//creating groups
 obstaclesGroup=new Group();
 cloudsGroup=new Group();

//trex.debug=true;
trex.setCollider("circle",0,0,45);
}
function draw() {
console.log(trex.y)
 
  
  //set background to white
  background("white");
  textSize(25);
  
  text("score:"+score,55,65);
  text("Highest:"+HScore,55,35);
  
  if(gameState === "play") {
      clouds();
      obstacles();
       trex.addAnimation("trex",treximg);
      
       score=score+Math.round(getFrameRate()/60);
       ground.velocityX = -(6+score*2/200);
       
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  
     //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 359){
    trex.velocityY = -13 ;
    
  }    
//   if(trex.y<360)  {
//     trex.changeAnimation("still",trexStill);
//   }
  
  
    if(mousePressedOver(Bot)){
        flag=1;
        trex.setCollider("circle",50,0,45);
        trex.changeAnimation("trex",treximg);
       
        
     }
    else if(obstaclesGroup.isTouching(trex)&&flag===0){
      gameState="end";
    }
  if(obstaclesGroup.isTouching(trex)&&flag===1){
           trex.velocityY = -13 ;
           
     }
  if(mousePressedOver(stop)){
        flag=0;
  trex.setCollider("circle",0,0,45);
     }
  
  }


  else if(gameState === "end") {
trex.velocityX=0;
Restart.visible=true;
gameover.visible=true;
     ground.velocityX = 0;
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     trex.changeAnimation("");
     trex.velocityY=0;
     
  }
  
 if(mousePressedOver(Restart)) {
   reset();
 }
 
 
  
 
  

 

  
  //add gravity
  trex.velocityY = trex.velocityY + 0.8;
  
  //stop trex from falling down
  trex.collide(invisibleGround);


  //console.log(World.frameCount)
  drawSprites();
}



function clouds() {
 
 
  if(World.frameCount%60===0)  {
      var cloud = createSprite(705,200,10,10);
      cloud.y = random(300,150);
      cloud.velocityX = -3 ; 
      cloud.addAnimation("cloud",cloudimg);
      cloud.depth = trex.depth;
      trex.depth=trex.depth+1;
      cloud.lifetime =705/3 ;
      cloudsGroup.add(cloud);
  }
}
function obstacles()  {
  if(World.frameCount%60===0)  {
  
    var obstacle = createSprite(705,365,10,10);
    obstacle.scale=0.5;
    var r =Math.round(random(1,6));
    
    switch(r){
      case 1:obstacle.addImage("o1",o1img)
        break;
      case 2:obstacle.addImage("o2",o2img)
        break;
      case 3:obstacle.addImage("o3",o3img)
        break;
      case 4:obstacle.addImage("o4",o4img)
        break;
      case 5:obstacle.addImage("o5",o5img)
        break;
      case 6:  obstacle.addImage("o6",o6img);
        break;
        default: break; 
    }
    
    obstacle.lifetime = 705/5;
    obstacle.velocityX = -(5+score*2/100);
    obstaclesGroup.add(obstacle);
    //obstacle.debug=true
  }
}
function reset()  {
  if(HScore<score) {
    HScore = score;
  }
 gameState = "play";
 Restart.visible=false;
  gameover.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.addAnimation("trex",treximg);
  score=0;
}
