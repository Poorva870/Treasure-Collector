var path,boy,cash,diamonds,jwellery,sword;

var pathImg,cashImg,diamondsImg,jwelleryImg,swordImg;

var treasureCollection = 0;

var cashG,diamondsG,jwelleryG,swordGroup;

var boy_collidedImg, boy_runningImg;

var dino, dinoImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameOver, gameOverImg;

function preload(){
  pathImg = loadImage("Road.png");
  boy_runningImg = loadAnimation("runner1.png", "runner2.png");
  boy_collidedImg = loadAnimation("runner2.png") 
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  gameOverImg =loadImage("gameOver.png");
  dinoImg = loadImage("trex1.png")
}

function setup(){
  createCanvas(400,400);
  
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 10;


  //creating boy running
  boy = createSprite(70,330,20,20);
  boy.addAnimation("SahilRunning",boy_runningImg);
  boy.addAnimation("SahilCollided",boy_collidedImg);
  boy.scale=0.08;
  
  gameOver = createSprite(200, 200);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.7;
  
  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
 
  gameOver.visible = false;
  
  boy.setCollider("circle",0,0,400); 
  //boy.debug = true;
}

function draw() {

  background(0);
  
  if(gameState === PLAY){
  
    boy.x = World.mouseX; 
    
   createCash();
   createDiamonds();
   createJwellery();
   createSword();
   createTrex();
    
    //code to reset the background
    if(path.y > 400 ){
    path.y = height/2;
   }
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+25;
    }
      
    if(diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+40;
    }
    
    if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+55;
    }
    
    if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState = END;
        gameOver.visible = true;
     }
   
}
  else if (gameState === END) {
    
    path.velocityY = 0;
    
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    boy.velocityY = 0;
   
    
   cashG.destroyEach();
   diamondsG.destroyEach();
   jwelleryG.destroyEach();
   swordGroup.destroyEach(); 
    
   boy.changeAnimation("SahilCollided", boy_collidedImg);
  }
  
  edges= createEdgeSprites();
  boy.collide(edges);

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

  function createCash() {
    if (World.frameCount % 80 == 0) {
      var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
      cash.addImage(cashImg);
      cash.scale=0.12;
      cash.velocityY = 8;
      cash.lifetime = 150;
      cashG.add(cash);
    }
}

  function createDiamonds() {
    if (World.frameCount % 100 == 0) {
      var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.velocityY = 6;
      diamonds.lifetime = 150;
      diamondsG.add(diamonds);
    }
}

  function createJwellery() {
    if (World.frameCount % 100 == 0) {
      var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
      jwellery.addImage(jwelleryImg);
      jwellery.scale=0.13;
      jwellery.velocityY = 7;
      jwellery.lifetime = 150;
      jwelleryG.add(jwellery);
    }
}

  function createSword(){
    if (World.frameCount % 30 == 0) {
      var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.velocityY = 10;
      sword.lifetime = 150;
      swordGroup.add(sword);
    }
}

 function createTrex(){
   if (World.frameCount % 100 == 0) {
      var trex = createSprite(Math.round(random(50, 350),40, 10, 10));
      trex.addImage("dino", dinoImg);
      trex.scale=0.7;
      trex.velocityY = 10;
      trex.lifetime = 150;
    }
 }